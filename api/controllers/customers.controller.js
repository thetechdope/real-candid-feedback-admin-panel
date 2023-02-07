import bcrypts from "bcryptjs";
import CustomersModel from "../models/customers.model.js";
import nodemailer from "nodemailer";

export const getAllCustomers = async (req, res) => {
  const getAllCustomers = await CustomersModel.find();
  res.status(200).json(getAllCustomers);
};

export const getAllVerifiedCustomers = async (req, res) => {
  const getAllVerifiedCustomers = await CustomersModel.find({
    isEmailVerfified: true,
  });
  res.status(200).json(getAllVerifiedCustomers);
};

export const addNewCustomer = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    const encryptedPassword = await bcrypts.hash(password, 10);
    const addedCustomer = await CustomersModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      phoneNumber: phoneNumber,
      otp: Math.floor((Math.random() + 1) * 1000),
    });
    addedCustomer.save();

    // Logic to send email for OTP

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "alford.lubowitz@ethereal.email",
        pass: "28gV2v6DUzQN9HFp5u",
      },
    });

    const message = {
      from: "alford.lubowitz@ethereal.email",
      to: "thetechdope.trainings@gmail.com",
      subject: "Email Verfication OTP",
      text: `Your OTP is ${addedCustomer.otp}`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.json({
        previewURL: nodemailer.getTestMessageUrl(info),
        addedCustomer: addedCustomer,
      });
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: `Error: ${error}`,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const searchedRecord = await CustomersModel.find({ email: email });

  console.log("TEST -> ", searchedRecord);

  if (searchedRecord.length > 0) {
    if (searchedRecord[0].otp == otp) {
      try {
        const result = await CustomersModel.updateOne(
          { email: email },
          {
            $set: {
              isEmailVerfified: true,
            },
          }
        );
        if (result.acknowledged) {
          res.status(200).json({
            status: true,
            message: "OTP Verification Successful!",
          });
        } else {
          res.status(400).json({
            status: false,
            message: "OTP Verification Failed!",
          });
        }
      } catch (error) {
        res.status(error.code).json({
          status: false,
          message: `Error: ${error.message}`,
        });
      }
    } else {
      res.status(400);
      res.json({ status: false, message: "Invalid OTP Entered!" });
    }
  } else {
    res.status(400);
    res.json({ status: false, message: "Email Not Found!" });
  }
};

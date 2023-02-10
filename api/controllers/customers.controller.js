import bcrypts from "bcryptjs";
import console from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CustomersModel from "../models/customers.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    let newCustomerDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      phoneNumber: phoneNumber,
      otp: Math.floor((Math.random() + 1) * 1000),
    };

    if (req.file) {
      newCustomerDetails = {
        profileImage: {
          name: `${firstName.toUpperCase()}-Avatar`,
          image: {
            data: fs.readFileSync(
              path.join(
                __dirname.slice(0, -12) +
                  "/public/uploaded-images/ABCDEFG-DP-123.jpeg"
              )
            ),
            contentType: "image/png",
          },
        },
        ...newCustomerDetails,
      };
    }

    const addedCustomer = await CustomersModel.create(newCustomerDetails);
    addedCustomer.save();

    res.status(200);
    res.json(addedCustomer);
  } catch (error) {
    res.status(400);
    res.json({
      error: `AKSHAY Error -> ${error}`,
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

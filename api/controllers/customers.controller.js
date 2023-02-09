import bcrypts from "bcryptjs";
import CustomersModel from "../models/customers.model.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config()
// ---------------------------------------------------- 
/*
const sendGrid = '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';
console.log(sendGrid)

sgMail.setApiKey(sendGrid)
const msg= {
  to:"hrishibhagat09@gmail.com",
  from:"hrishibhagat09@gmail.com",
  subject:"SendGrid Mail Check...",
  text:"Your OTP Is...",
}

sgMail.send(msg)
.then((res)=>{
  console.log("Email Sent...")
})
.catch((err)=>{
  console.log(err)
})

*/
// ---------------------------------------------------- 


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
            data: req.file.filename,
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

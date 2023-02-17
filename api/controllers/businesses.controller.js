import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BusinessModel from "../models/businesses.model.js";
import SendEmailOTP from "../utils/SendEmailOTP.js";

export const loginBusiness = async (req, res) => {
  const { businessEmail, password } = req.body;

  // Check for user email
  const businessDetails = await BusinessModel.findOne({ businessEmail });

  if (
    businessDetails &&
    (await bcrypt.compare(password, businessDetails.password))
  ) {
    res.status(200);
    res.json({
      _id: businessDetails.id,
      businessImage: businessDetails.businessImage,
      businessName: businessDetails.businessName,
      businessEmail: businessDetails.businessEmail,
      businessWebsiteUrl: businessDetails.businessWebsiteUrl,
      businessPhoneNumber: businessDetails.businessPhoneNumber,
      businessAddress: businessDetails.businessAddress,
      isActive: businessDetails.isActive,
      isEmailVerfified: businessDetails.isEmailVerfified,
      token: generateToken({
        id: businessDetails.id,
        businessEmail: businessDetails.businessEmail,
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

export const getAllBusinesses = async (req, res) => {
  const response = await BusinessModel.find();
  res.status(200).json(response);
};

export const getBusinessDetailsByEmail = async (req, res) => {
  const { email } = req.params;
  const response = await BusinessModel.find({ businessEmail: email });
  res.status(200).json(response);
};

export const addNewBusiness = async (req, res) => {
  const {
    businessName,
    businessAddress,
    businessEmail,
    password,
    businessPhoneNumber,
    businessWebsiteUrl,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  let newBusinessDetails = {
    businessName: businessName,
    businessAddress: businessAddress,
    businessEmail: businessEmail,
    password: encryptedPassword,
    businessPhoneNumber: businessPhoneNumber,
    businessWebsiteUrl: businessWebsiteUrl,
    otp: Math.floor((Math.random() + 1) * 1000),
  };

  const addedBusiness = await BusinessModel.create(newBusinessDetails);
  addedBusiness.save();

  // Logic to send OTP for Email Verification
  try {
    await SendEmailOTP(
      newBusinessDetails.otp,
      newBusinessDetails.businessEmail
    );
    res.status(200);
    res.json({
      message: "OTP Verification Email Sent Successfully.",
      addedBusiness,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(200);
    res.json({
      message: "Details Saved but OTP Verification Email Sending Failed",
      addedBusiness,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { businessEmail, otp } = req.body;

  const searchedRecord = await BusinessModel.findOne({ businessEmail });

  if (searchedRecord) {
    if (searchedRecord.otp == otp) {
      const result = await BusinessModel.updateOne(
        { businessEmail },
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
    } else {
      res.status(400);
      throw new Error("Invalid OTP Entered!");
    }
  } else {
    res.status(400);
    throw new Error("Business Email Not Found!");
  }
};

export const resendEmailVerificationOTP = async (req, res) => {
  const { businessEmail } = req.params;
  const searchedRecord = await BusinessModel.findOne({ businessEmail });

  if (searchedRecord) {
    const { otp } = searchedRecord;

    // Logic to send OTP for Email Verification
    try {
      await SendEmailOTP(otp, businessEmail);
      res.status(200);
      res.json({
        message: "OTP Verification Email Sent Successfully.",
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400);
      throw new Error("OTP Verification Email Sending Failed.");
    }
  } else {
    res.status(400);
    throw new Error(
      "OTP Verification Email Sending Failed. Business Email Not Found!"
    );
  }
};

export const updateBusinessProfile = async (req, res) => {
  const { email } = req.params;
  const updateBusinessDetails = await BusinessModel.findOneAndUpdate(
    { businessEmail: email },
    { $set: { ...req.body } },
    { new: true }
  );
  if (!updateBusinessDetails) {
    res.status(400).json({ message: "Business Profile Not found" });
    throw new Error("Business Profile Not found");
  } else {
    res.json({
      data: updateBusinessDetails,
      message: "Congrats your business account has been updated.",
    });
  }
};

export const activateOrDeactivateBusiness = async (req, res) => {
  const { businessEmail } = req.body;
  const searchedRecord = await BusinessModel.findOne({ businessEmail });

  if (searchedRecord) {
    const result = await BusinessModel.updateOne(
      { businessEmail },
      {
        $set: {
          isActive: !searchedRecord.isActive,
        },
      }
    );
    if (result.acknowledged) {
      res.status(200).json({
        status: true,
        message: "Activation/Deactivation Successful!",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Activation/Deactivation Failed!",
      });
    }
  } else {
    res.status(400);
    throw new Error("There is no business associated with the given email.");
  }
};

export const deleteAccount = async (req, res) => {
  const { businessEmail } = req.business;

  const result = await BusinessModel.deleteOne({ businessEmail });
  if (result.acknowledged) {
    res.status(200).json({
      status: true,
      message: "Your account has been deleted successfully!",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Account Deletion Failed!",
    });
  }
};

export const deleteBusiness = async (req, res) => {
  const { businessEmail } = req.params;
  const searchedRecord = await BusinessModel.findOne({ businessEmail });

  if (searchedRecord) {
    const result = await BusinessModel.deleteOne({ businessEmail });
    if (result.acknowledged) {
      res.status(200).json({
        status: true,
        message: "Business Deleted Successfully!",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Business Deletion Failed!",
      });
    }
  } else {
    res.status(400);
    throw new Error(
      "There is no Business associated with the given Business Email."
    );
  }
};

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
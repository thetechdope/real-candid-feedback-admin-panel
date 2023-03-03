import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import BusinessesModel from "../models/businesses.model.js";
import SendEmailOTP from "../utils/SendEmailOTP.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

export const loginBusiness = async (req, res) => {
  const { businessEmail, password } = req.body;

  // Check for user email
  const businessDetails = await BusinessesModel.findOne({ businessEmail });

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
  const response = await BusinessesModel.find();
  res.status(200).json(response);
};

export const getBusinessDetailsByEmail = async (req, res) => {
  const { email } = req.params;
  const response = await BusinessesModel.findOne({ businessEmail: email });

  if (response) {
    res.status(200);
    res.json(response);
  } else {
    res.status(400);
    throw new Error("Business Email Not Found!");
  }
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
    // otp: Math.floor((Math.random() + 1) * 1000),
    otp: 1234,
  };

  // Checking if Profile Image was sent in Request
  if (req.files && req.files.avatar) {
    try {
      newBusinessDetails = {
        ...newBusinessDetails,
        businessImage: (await UploadProfileImage(req.files.avatar)).url,
      };
    } catch (error) {
      console.log(`Error - ${error}`);
    }
  }

  // Checking if Business Already Present
  const businessDetails = await BusinessesModel.findOne({ businessEmail });
  if (businessDetails) {
    res.status(400);
    res.json({
      message: `Business '${businessDetails.businessName}' already present.`,
    });
  } else {
    const addedBusiness = await BusinessesModel.create(newBusinessDetails);
    addedBusiness.save();

    // Logic to send OTP for Email Verification
    try {
      await SendEmailOTP(
        `Your Email Verification OTP is - ${newBusinessDetails.otp}.\nPlease verify your email quickly.`,
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
  }
};

export const verifyEmail = async (req, res) => {
  const { businessEmail, otp } = req.body;

  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

  if (searchedRecord) {
    if (searchedRecord.otp == otp) {
      const result = await BusinessesModel.updateOne(
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
  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

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
  const { businessEmail } = req.business;
  let data = {
    ...req.body,
  };

  // Temporary Solution
  if ("deleteBusinessImage" in data) {
    data = {
      ...data,
      businessImage: "",
    };
  } else {
    // Checking if Profile Image was sent in Request
    if (req.files && req.files.avatar) {
      data = {
        ...data,
        businessImage: (await UploadProfileImage(req.files.avatar)).url,
      };
    }
  }

  const updateBusinessDetails = await BusinessesModel.findOneAndUpdate(
    { businessEmail },
    { $set: data },
    { new: true }
  );

  if (!updateBusinessDetails) {
    res.status(400).json({ message: "Business Profile Not found" });
    throw new Error("Business Profile Not found");
  } else {
    res.json({
      data: updateBusinessDetails,
      message: "Business Data Has Been Updated Successfully!",
    });
  }
};

export const activateOrDeactivateBusiness = async (req, res) => {
  const { businessEmail } = req.body;
  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

  if (searchedRecord) {
    const result = await BusinessesModel.updateOne(
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

  const result = await BusinessesModel.deleteOne({ businessEmail });
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
  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

  if (searchedRecord) {
    const result = await BusinessesModel.deleteOne({ businessEmail });
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

export const forgotBusinessPassword = async (req, res) => {
  const { businessEmail } = req.params;
  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

  if (searchedRecord) {
    const { otp } = searchedRecord;

    try {
      await SendEmailOTP(
        `Your Forgot Password OTP is - ${otp}.\n`,
        businessEmail
      );
      res.status(200);
      res.json({
        message: "Forgot Password OTP Sent Successfully.",
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(400);
      throw new Error("Forgot Password OTP Sending Failed.");
    }
  } else {
    res.status(400);
    throw new Error(
      "Forgot Password OTP Sending Failed. Business Email Not Found!"
    );
  }
};

export const resetBusinessPassword = async (req, res) => {
  const { businessEmail, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    res.status(401).json({ message: "Password does not match!" });
    return;
  }

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
  const result = await BusinessesModel.updateOne(
    { businessEmail },
    {
      $set: {
        password: encryptedNewPassword,
      },
    }
  );
  res.json(result);
};

export const changeBusinessPassword = async (req, res) => {
  const { businessEmail } = req.business;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const searchedBusiness = await BusinessesModel.findOne({ businessEmail });

  // Compare Passwords
  const correctPassword = await bcrypt.compare(
    currentPassword,
    searchedBusiness.password
  );

  if (!correctPassword) {
    res.status(401);
    res.json({ message: "Please Enter Correct Password!" });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(401);
    res.json({ message: "New Password & Confirm Password Not Matched!" });
    return;
  }

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

  if (currentPassword === newPassword) {
    res.status(401);
    res.json({ message: "New Password can't be same as Current Password!" });
    return;
  }

  const result = await BusinessesModel.updateOne(
    { businessEmail },
    {
      $set: {
        password: encryptedNewPassword,
      },
    }
  );

  res.status(200);
  res.json(result);
};

export const isBusinessAvailable = async (req, res) => {
  const { businessEmail } = req.params;
  const searchedRecord = await BusinessesModel.findOne({ businessEmail });

  if (searchedRecord) {
    res.status(200);
    res.json(searchedRecord);
  } else {
    res.status(400);
    throw new Error("Business Is Not Available!");
  }
};

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

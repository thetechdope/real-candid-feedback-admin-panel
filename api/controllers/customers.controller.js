import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomersModel from "../models/customers.model.js";
import SendEmailOTP from "../utils/SendEmailOTP.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const customerDetails = await CustomersModel.findOne({ email });

  if (
    customerDetails &&
    (await bcrypt.compare(password, customerDetails.password))
  ) {
    res.status(200);
    // console.log("Logged In Successfully");
    res.json({
      _id: customerDetails.id,
      profileImage: customerDetails.profileImage,
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      email: customerDetails.email,
      phoneNumber: customerDetails.phoneNumber,
      isActive: customerDetails.isActive,
      isEmailVerfified: customerDetails.isEmailVerfified,
      token: generateToken({
        id: customerDetails.id,
        email: customerDetails.email,
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

export const getAllCustomers = async (req, res) => {
  const getAllCustomers = await CustomersModel.find();
  res.status(200).json(getAllCustomers);
};

export const addNewCustomer = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  let newCustomerDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: encryptedPassword,
    phoneNumber: phoneNumber,
    //otp: Math.floor((Math.random() + 1) * 1000),
    otp: "1234",
  };

  // Checking if Profile Image was sent in Request
  if (req.files && req.files.avatar) {
    try {
      newCustomerDetails = {
        ...newCustomerDetails,
        profileImage: (await UploadProfileImage(req.files.avatar)).url,
      };
    } catch (error) {
      console.log(`Error - ${error}`);
    }
  }

  // Checking if Customer Already Present
  const customerDetails = await CustomersModel.findOne({ email });

  if (customerDetails) {
    res.status(400);
    res.json({
      message: `Customer '${customerDetails.firstName} ${customerDetails.lastName}' already present.`,
    });
  } else {
    const addedCustomer = await CustomersModel.create(newCustomerDetails);
    addedCustomer.save();

    // Logic to send OTP for Email Verification
    try {
      await SendEmailOTP(
        `Your Email Verification OTP is - ${newCustomerDetails.otp}.\nPlease verify your email quickly.`,
        newCustomerDetails.email
      );
      res.status(200);
      res.json({
        message: "OTP Verification Email Sent Successfully.",
        addedCustomer,
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(200);
      res.json({
        message: "Details Saved but OTP Verification Email Sending Failed",
        addedCustomer,
      });
    }
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const searchedRecord = await CustomersModel.find({ email: email });

  if (searchedRecord.length > 0) {
    if (searchedRecord[0].otp == otp) {
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
    } else {
      res.status(400);
      throw new Error("Invalid OTP Entered!");
    }
  } else {
    res.status(400);
    throw new Error("Email Not Found!");
  }
};

export const resendEmailVerificationOTP = async (req, res) => {
  const { email } = req.params;
  const searchedRecord = await CustomersModel.findOne({ email });

  if (searchedRecord) {
    const { otp } = searchedRecord;

    // Logic to send OTP for Email Verification
    try {
      await SendEmailOTP(otp, email);
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
    throw new Error("OTP Verification Email Sending Failed. Email Not Found!");
  }
};

export const updateCustomerProfile = async (req, res) => {
  const { email } = req.customer;
  let data = {
    ...req.body,
  };

  // Temporary Solution
  if ("deleteProfileImage" in data) {
    data = {
      ...data,
      profileImage: "",
    };
  } else {
    // Checking if Profile Image was sent in Request
    if (req.files && req.files.avatar) {
      data = {
        ...data,
        profileImage: (await UploadProfileImage(req.files.avatar)).url,
      };
    }
  }

  const updateCustomer = await CustomersModel.findOneAndUpdate(
    { email },
    { $set: data },
    { new: true }
  );
  if (!updateCustomer) {
    res.status(400);
    res.json({ message: "Customer Profile Not found" });
  } else {
    res.status(200);
    res.json({
      data: updateCustomer,
      message: "Customer Data Has Been Updated Successfully!",
    });
  }
};

export const activateOrDeactivateCustomer = async (req, res) => {
  const { email } = req.body;
  const searchedRecord = await CustomersModel.findOne({ email: email });

  if (searchedRecord) {
    const result = await CustomersModel.updateOne(
      { email: email },
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
    throw new Error("There is no customer associated with the given email.");
  }
};

export const deleteAccount = async (req, res) => {
  const { email } = req.customer;

  const result = await CustomersModel.deleteOne({ email });
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

export const deleteCustomer = async (req, res) => {
  const { email } = req.params;
  const searchedRecord = await CustomersModel.findOne({ email: email });

  if (searchedRecord) {
    const result = await CustomersModel.deleteOne({ email: email });
    if (result.acknowledged) {
      res.status(200).json({
        status: true,
        message: "Customer Deleted Successfully!",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Customer Deletion Failed!",
      });
    }
  } else {
    res.status(400);
    throw new Error("There is no customer associated with the given email.");
  }
};

export const forgotCustomerPassword = async (req, res) => {
  const { email } = req.params;
  const searchedRecord = await CustomersModel.findOne({ email });

  if (searchedRecord) {
    const { otp } = searchedRecord;

    try {
      await SendEmailOTP(`Your Forgot Password OTP is - ${otp}.\n`, email);
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
    throw new Error("Forgot Password OTP Sending Failed. Email Not Found!");
  }
};

export const resetCustomerPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    res.status(401).json({ message: "Password does not match!" });
    return;
  }

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
  const result = await CustomersModel.updateOne(
    { email: email },
    {
      $set: {
        password: encryptedNewPassword,
      },
    }
  );
  res.json(result);
};

export const changeCustomerPassword = async (req, res) => {
  const { email } = req.customer;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const searchedCustomer = await CustomersModel.findOne({ email });

  // Compare Passwords
  const correctPassword = await bcrypt.compare(
    currentPassword,
    searchedCustomer.password
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

  const result = await CustomersModel.updateOne(
    { email },
    {
      $set: {
        password: encryptedNewPassword,
      },
    }
  );

  res.status(200);
  res.json(result);
};

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

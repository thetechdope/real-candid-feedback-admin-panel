import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("email",email)
  console.log("password",password)

  // Check for user email
  const adminDetails = await AdminModel.findOne({ email });

  if (adminDetails && (await bcrypt.compare(password, adminDetails.password))) {
    res.status(200);
    console.log("Logged In Successfully");
    res.json({
      _id: adminDetails.id,
      firstName: adminDetails.firstName,
      lastName: adminDetails.lastName,
      email: adminDetails.email,
      phoneNumber: adminDetails.phoneNumber,
      profileImage: adminDetails.profileImage,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

export const addNewAdmin = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  let newAdminDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: encryptedPassword,
    phoneNumber: phoneNumber,
  };

  // Checking if Profile Image was sent in Request
  if (req.files && req.files.avatar) {
    try {
      newAdminDetails = {
        ...newAdminDetails,
        profileImage: (await UploadProfileImage(req.files.avatar)).url,
      };
    } catch (error) {
      console.log(`Error - ${error}`);
    }
  }

  const addedAdmin = await AdminModel.create(newAdminDetails);
  addedAdmin.save();
  res.send(addedAdmin)

};

export const getAllAdmin = async (req, res) => {
  const getAllAdminDetails = await AdminModel.find();
  res.status(200).json(getAllAdminDetails);
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

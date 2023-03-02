import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const adminDetails = await AdminModel.findOne({ email });
  if (adminDetails) {
    if (await bcrypt.compare(password, adminDetails.password)) {
      res.status(200);
      res.json(adminDetails);
    } else {
      res.status(400);
      res.json({ message: "Incorrect Password!" });
    }
  } else {
    res.status(400);
    res.json({ message: "Email not Found!" });
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
  res.send(addedAdmin);
};

export const getAllAdmin = async (req, res) => {
  const getAllAdminDetails = await AdminModel.find();
  res.status(200).json(getAllAdminDetails);
};

export const updateAdminProfile = async (req, res) => {
  const { email } = req.body;
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

  const updateCustomer = await AdminModel.findOneAndUpdate(
    { email },
    { $set: data },
    { new: true }
  );
  if (!updateCustomer) {
    res.status(400);
    res.json({ message: "Admin Profile Not found" });
  } else {
    res.status(200);
    res.json({
      data: updateCustomer,
      message: "Admin Data Has Been Updated Successfully!",
    });
  }
};

export const changeAdminPassword = async (req, res) => {
  const { email } = req.body;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const searchedAdmin = await AdminModel.findOne({ email });

  // Compare Passwords
  const correctPassword = await bcrypt.compare(
    currentPassword,
    searchedAdmin.password
  );

  if (!correctPassword) {
    res.status(400);
    res.json({ message: "Please Enter Correct Password!" });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    res.json({ message: "New Password & Confirm Password Not Matched!" });
    return;
  }

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

  if (currentPassword === newPassword) {
    res.status(400);
    res.json({ message: "New Password can't be same as Current Password!" });
    return;
  }

  const result = await AdminModel.updateOne(
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

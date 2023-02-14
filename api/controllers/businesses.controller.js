import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BusinessModel from "../models/businesses.model.js";

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
      businessName: businessDetails.businessName,
      businessEmail: businessDetails.businessEmail,
      businessWebsiteUrl: businessDetails.businessWebsiteUrl,
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

  res.status(200);
  res.json(addedBusiness);
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

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

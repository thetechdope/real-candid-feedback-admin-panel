import bcrypts from "bcryptjs";
import BusinessModel from "../models/businesses.model.js";

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

  try {
    const encryptedPassword = await bcrypts.hash(password, 10);

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
  } catch (error) {
    res.status(400);
    res.json({
      error: error,
    });
  }
};
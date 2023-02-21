import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CustomersModel from "../models/customers.model.js";
import SendEmailOTP from "../utils/SendEmailOTP.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loginCustomer = async (req, res) => {
	const { email, password } = req.body;

  // Check for user email
  const customerDetails = await CustomersModel.findOne({ email });
  console.log("customerDetails", customerDetails)
  if (
    customerDetails &&
    (await bcrypt.compare(password, customerDetails.password))
  ) {
    res.status(200);
    console.log("Logged In Successfilly");
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

export const getAllVerifiedCustomers = async (req, res) => {
	const getAllVerifiedCustomers = await CustomersModel.find({
		isEmailVerfified: true,
	});
	res.status(200).json(getAllVerifiedCustomers);
};

export const addNewCustomer = async (req, res) => {
	const { firstName, lastName, email, password, phoneNumber } = req.body;
	const avatar = req.files.avatar;

	const encryptedPassword = await bcrypt.hash(password, 10);
	const avatarUrl = (await UploadProfileImage(avatar)).url;
	let newCustomerDetails = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: encryptedPassword,
		profileImage: avatarUrl || "",
		phoneNumber: phoneNumber,

		otp: Math.floor((Math.random() + 1) * 1000),
	};
	const addedCustomer = await CustomersModel.create(newCustomerDetails);
	addedCustomer.save();

	// Logic to send OTP for Email Verification
	try {
		await SendEmailOTP(newCustomerDetails.otp, newCustomerDetails.email);
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
	const { email } = req.params;
	let avatar = req.files;
	let data = {
		...req.body,
	};
	if (avatar) {
		let newImageUrl = (await UploadProfileImage(avatar.avatar)).url;
		// if avatar the add to the data object
		data = { ...data, profileImage: newImageUrl };
	}
	const updateCustomer = await CustomersModel.findOneAndUpdate({ email }, { $set: data }, { new: true });
	if (!updateCustomer) {
		res.status(400).json({ message: "Customer Profile Not found" });
	} else {
		res.json({
			data: updateCustomer,
			message: "Congrats your Customer account has been updated.",
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

const generateToken = (obj) => {
	return jwt.sign(obj, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};



// Reset Password ------------------------------------------------------------------
export const changePassword = async (req, res) => {
  const { email } = req.params;
  const findCustomer = await CustomersModel.findOne({ email });
  const { currentPassword, newPassword, confirmPassword } = req.body;
  // compare passwords
  const correctPassword = await bcrypt.compare(
    currentPassword,
    findCustomer.password 
  );
  console.log(correctPassword);
  if (!correctPassword) {
    res.status(404).json({ message: "Please enter correct Password!" });
    return;
  }
  // res.send(correctPassword)
  if (newPassword !== confirmPassword) {
    res.status(401).json({ message: "Passwords not matched!" });
    return;
  }
  console.log(findCustomer.password);

  const encryptedNewPassword = await bcrypt.hash(newPassword, 10);  
  if (currentPassword == newPassword) {
    res
      .status(401)
      .json({ message: "Password should not be same as current password!" });
      return;
  }
  const result = await CustomersModel.updateOne(
    { email},
    {
      $set: {
        password: encryptedNewPassword,
      },
    }
  );
  res.send(result);
};

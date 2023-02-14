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
						data: fs.readFileSync(path.join(__dirname.slice(0, -12) + "/public/uploaded-images/ABCDEFG-DP-123.jpeg")),
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
};

export const verifyEmail = async (req, res) => {
	const { email, otp } = req.body;
	const searchedRecord = await CustomersModel.find({ email: email });

	console.log("TEST -> ", searchedRecord);

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

}
  
export const updateCustomerProfile = async (req, res) => {
	const { email } = req.params;

		const updateCustomer = await CustomersModel.findOneAndUpdate({ email }, { $set: { ...req.body } }, { new: true });
		if (!updateCustomer) {
			res.status(400).json({ message: "Customer Profile Not found" });
		} else {
			res.json(updateCustomer);
		}

};


// Reset Password -------------------------------------------------------------------------
export const resetPassword = async (req, res) => {
	const { id } = req.params;
	const findCustomer = await CustomersModel.findOne({ _id: id });
	const { currentPassword, newPassword, confirmPassword } = req.body;
	// compare passwords
	const correctPassword = await bcrypts.compare(
	  currentPassword, findCustomer.password);
	console.log(correctPassword)
	if(!correctPassword){
	  res.status(404).json({ message: "Please enter correct Password!" });
	  return;
	}
	// res.send(correctPassword)
	if (newPassword !== confirmPassword) {
	  res.status(401).json({ message: "Passwords not matched!" });
	  return;
	}
	console.log(findCustomer.password);
	const encryptedNewPassword = await bcrypts.hash(newPassword, 10);
	if (encryptedNewPassword == findCustomer.password) {
	  res
		.status(401)
		.json({ message: "Password should not be same as current password!" });
	}
	const result = await CustomersModel.updateOne(
	  { _id: id },
	  {
		$set: {
		  password: encryptedNewPassword,
		},
	  }
	);
	res.send(result);
  };

  // Delete Customer--------------------------------------------------------------------
export const deleteCustomer = async (req, res) => {
	const { id } = req.params;
	const result = await CustomersModel.deleteOne({ _id: id });
	console.log(`Deleted Customer of Id ${id}`);
	res.send(result);
  };
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
	const { businessName, businessAddress, businessEmail, password, businessPhoneNumber, businessWebsiteUrl } = req.body;

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
		throw new Error("Business Profile Not found")
	} else {
		res.json({
			data:updateBusinessDetails,
			message:"Congrats your business account has been updated."
		});
	}
};


// Reset Password ------------------------------------------------------------------
export const resetPassword = async (req, res) => {
	const { id } = req.params;
	const findBusiness = await BusinessModel.findOne({ _id: id });
	const { currentPassword, newPassword, confirmPassword } = req.body;
	// compare passwords
	const correctPassword = await bcrypts.compare(
	  currentPassword, findBusiness.password);
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
	  console.log(findBusiness.password)
	  const encryptedNewPassword =  await bcrypts.hash(newPassword , 10)
	  if (encryptedNewPassword == findBusiness.password) {
		res
		  .status(401)
		  .json({ message: "Password should not be same as current password!" });
	  }
	  const result = await BusinessModel.updateOne(
		{ _id: id },
		{
		  $set: {
			password: encryptedNewPassword,
		  },
		}
	  );
	  res.send(result);
  };

  
// Delete Business ----------------------------------------------------------
export const deleteBusiness = async(req,res)=>{
	const {id} = req.params;
	const result = await BusinessModel.deleteOne({_id:id})
	console.log(`Deleted Business of Id ${id}`)
	res.send(result)
  }
import bcrypts from "bcryptjs";
import businessModel from "../models/business.model.js";
import BusinessModel from "../models/business.model.js";

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


// Delete Business ----------
export const deleteBusiness = async(req,res)=>{
  const {id} = req.params;
  const result = await BusinessModel.deleteOne({_id:id})
  console.log(`Deleted Business of Id ${id}`)
  res.send(result)
}



// Login Customer ---------------------------------------------------------
export const BusinessLogin = async (req, res) => {
  const { businessEmail, password } = req.body;
  try {
    //check if user is existed or not
    const existedBusiness = await businessModel.findOne({ businessEmail });
    console.log(existedBusiness);
    if (!existedBusiness) {
      return res.status(404).json({ message: "Business does not exist" });
    }
    //check if password is correct or not
    const correctPassword = await bcrypts.compare(password, existedBusiness.password);
    console.log(correctPassword)
    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // const secret = "test";
    // const token = jwt.sign({ email: existedBusiness.email }, secret, {
    //   expiresIn: "1h",
    // });
    // res.status(200).json({ result: existedBusiness, token });
    // check if user is active or not

  
    if (!existedBusiness.isEmailVerfified) {
      return res
        .status(400)
        .json({ message: "Please do your Email verification." });
    }
    if (!existedBusiness.isActive) {
      return res
        .status(400)
        .json({ message: "This Business account has been suspended." });
    }
    res.send("Logged in successfully!")
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};


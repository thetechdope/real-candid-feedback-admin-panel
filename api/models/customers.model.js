import mongoose from "mongoose";

const ProfilePictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: false,
  },
});

const CustomersSchema = new mongoose.Schema(
  {
    profileImage: {
      type: ProfilePictureSchema,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    isEmailVerfified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Customers",
  }
);

export default mongoose.model("CustomersModel", CustomersSchema);

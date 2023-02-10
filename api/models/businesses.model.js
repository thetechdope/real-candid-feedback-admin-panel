import mongoose from "mongoose";

const BusinessPictureSchema = new mongoose.Schema({
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

const BusinessesSchema = new mongoose.Schema(
  {
    businessImage: {
      type: BusinessPictureSchema,
      required: false,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    businessPhoneNumber: {
      type: String,
      required: true,
    },
    businessWebsiteUrl: {
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
    collection: "Business",
  }
);

export default mongoose.model("BusinessesModel", BusinessesSchema);

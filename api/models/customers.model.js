import mongoose from "mongoose";

const FeedbacksSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 2,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const CustomersSchema = new mongoose.Schema(
  {
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
    feedbacksProvided: {
      type: [FeedbacksSchema],
    },
  },
  {
    collection: "Customers",
  }
);

export default mongoose.model("CustomersModel", CustomersSchema);

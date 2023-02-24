import mongoose from "mongoose";

const FeedbacksSchema = new mongoose.Schema(
  {
    businessImage: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      enum: [0, 1, 2], // Only These Values Are Allowed
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: Date.now(),
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    customerName: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
    },
  },
  {
    collection: "Feedbacks",
  }
);

export default mongoose.model("Feedbacks", FeedbacksSchema);

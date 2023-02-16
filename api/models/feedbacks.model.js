import mongoose from "mongoose";

const FeedbacksSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 2,
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
    businessName:{
      type : String,
      required: true
    },
    businessEmail: {
      type: String,
      required: true,
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

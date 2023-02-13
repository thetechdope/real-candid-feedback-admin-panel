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
    createdAt: {
      type: String,
      default: Date.now(),
    },
    customerEmail: {
      type: String,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Feedbacks",
  }
);

export default mongoose.model("FeedbacksModel", FeedbacksSchema);

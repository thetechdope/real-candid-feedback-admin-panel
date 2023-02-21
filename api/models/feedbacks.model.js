import mongoose from "mongoose";

const FeedbacksSchema = new mongoose.Schema(
  {
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
<<<<<<< HEAD
    customerName: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
=======
    createdAt: {
      type: String,
      default: Date.now(),
>>>>>>> cb40b088a3e6ee72e0501a521591ee8387e94551
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

export default mongoose.model("FeedbacksModel", FeedbacksSchema);

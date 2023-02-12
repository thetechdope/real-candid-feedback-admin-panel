import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
  getAllFeedbacks,
  addNewFeedback,
} from "../controllers/feedbacks.controller.js";

const router = express.Router();

// Get All Feedbacks
router.get("/", tryCatch(getAllFeedbacks));

// Add New Feedback
router.post("/", tryCatch(addNewFeedback));

export default router;

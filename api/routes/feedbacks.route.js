import express from "express";
import {
  getAllFeedbacks,
  addNewFeedback,
} from "../controllers/feedbacks.controller.js";

const router = express.Router();

// Get All Feedbacks
router.get("/", getAllFeedbacks);

// Add New Feedback
router.post("/", addNewFeedback);

export default router;

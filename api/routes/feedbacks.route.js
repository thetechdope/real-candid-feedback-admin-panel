import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
	addNewFeedback,
	addNewAnonymousFeedback,
	getAllFeedbacks,
	getAllAnonymousFeedbacks,
	getCustomersFeedbacksByEmail,
	getBusinessesFeedbacksByEmail,
	getLoggedInCustomerFeedbacks,
	getLoggedInBusinessFeedbacks,
} from "../controllers/feedbacks.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// For Customer Mobile Application

router.post("/", authMiddleware, tryCatch(addNewFeedback)); // Add New Feedback
router.post("/anonymous", tryCatch(addNewAnonymousFeedback)); // Add Anonymous Feedback
router.get("/customer/:email", tryCatch(getCustomersFeedbacksByEmail)); // Get Customers Feedbacks by Email
router.get("/loggedin-customer", authMiddleware, tryCatch(getLoggedInCustomerFeedbacks)); // Get Logged In Customers Feedbacks

// For Business Mobile Application

router.get("/business/:businessEmail", tryCatch(getBusinessesFeedbacksByEmail)); // Get Businesses Feedbacks by Email
router.get("/loggedin-business", authMiddleware, tryCatch(getLoggedInBusinessFeedbacks)); // Get Logged In Business Feedbacks

// Optional

router.get("/", tryCatch(getAllFeedbacks)); // Get All Feedbacks
router.get("/anonymous", tryCatch(getAllAnonymousFeedbacks)); // Get All Anonymous Feedbacks

export default router;

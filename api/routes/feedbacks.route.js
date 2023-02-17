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

router.post("/add-new", authMiddleware, tryCatch(addNewFeedback)); // Add New Feedback
router.post("/anonymous", tryCatch(addNewAnonymousFeedback)); // Add Anonymous Feedback
router.get("/", tryCatch(getAllFeedbacks));
router.get(
  "/loggedin-customer",
  authMiddleware,
  tryCatch(getLoggedInCustomerFeedbacks)
); // Get Logged In Customers Feedbacks

// For Business Mobile Application

router.get(
  "/loggedin-business",
  authMiddleware,
  tryCatch(getLoggedInBusinessFeedbacks)
); // Get Logged In Business Feedbacks

// Not Required

router.get("/business/:businessEmail", tryCatch(getBusinessesFeedbacksByEmail)); // Get Business Feedbacks by Email
router.get("/customer/:email", tryCatch(getCustomersFeedbacksByEmail)); // Get Customer Feedbacks by Email
router.get("/anonymous", tryCatch(getAllAnonymousFeedbacks)); // Get All Anonymous Feedbacks

/*

Pending APIs -

Customer

Update Customer
Reset Password
Forgot Password
Email OTP
Delete Customer


Business

Update Business
Reset Password
Forgot Password
Email OTP
Delete Business

*/

export default router;

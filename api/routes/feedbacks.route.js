import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addNewFeedback,
  getAllFeedbacks,
  getAllAnonymousFeedbacks,
  getCustomersFeedbacksByEmail,
  getBusinessesFeedbacksByEmail,
  getLoggedInCustomerFeedbacks,
  getLoggedInBusinessFeedbacks,
} from "../controllers/feedbacks.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// Add New Feedback
router.post("/", authMiddleware, tryCatch(addNewFeedback));

// Get All Feedbacks
router.get("/", tryCatch(getAllFeedbacks));

// Get All Anonymous Feedbacks
router.get("/anonymous", tryCatch(getAllAnonymousFeedbacks));

// Get Customers Feedbacks by Email
router.get("/customer/:email", tryCatch(getCustomersFeedbacksByEmail));

// Get Businesses Feedbacks by Email
router.get("/business/:businessEmail", tryCatch(getBusinessesFeedbacksByEmail));

// Get Logged In Customers Feedbacks
router.get(
  "/loggedin-customer",
  authMiddleware,
  tryCatch(getLoggedInCustomerFeedbacks)
);

// Get Logged In Business Feedbacks
router.get(
  "/loggedin-business",
  authMiddleware,
  tryCatch(getLoggedInBusinessFeedbacks)
);

export default router;

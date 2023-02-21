import express from "express";
import {
  addNewBusiness,
  verifyEmail,
  resendEmailVerificationOTP,
  loginBusiness,
  updateBusinessProfile,
  getAllBusinesses,
  activateOrDeactivateBusiness,
  deleteAccount,
  deleteBusiness,
  getBusinessDetailsByEmail,
} from "../controllers/businesses.controller.js";
import tryCatch from "../utils/tryCatch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// For Mobile Application

router.post("/signup", tryCatch(addNewBusiness)); // Add New Business
router.get(
  "/resend-otp/:businessEmail",
  authMiddleware,
  tryCatch(resendEmailVerificationOTP)
); // Resend OTP for Email Verification
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginBusiness)); // Login Business
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Account
// router.patch("/:email", updateBusinessProfile); // Update Business Profile

// For Web Application

router.get("/", tryCatch(getAllBusinesses)); // Get All Businesses
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateBusiness)); // Activate or Deactivate Business
router.delete("/delete/:businessEmail", tryCatch(deleteBusiness)); // Delete Business

// Optional

// router.get("/:email", tryCatch(getBusinessDetailsByEmail)); // Get Business Details By Email

export default router;

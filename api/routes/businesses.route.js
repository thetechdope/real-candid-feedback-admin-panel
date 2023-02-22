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
	forgotBusinessPassword,
	resetBusinessPassword,
	changeBusinessPassword,
	isBusinessAvailable,
} from "../controllers/businesses.controller.js";
import tryCatch from "../utils/tryCatch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// For Mobile Application

router.post("/signup", tryCatch(addNewBusiness)); // Add New Business
router.get("/resend-otp", authMiddleware, tryCatch(resendEmailVerificationOTP)); // Resend OTP for Email Verification
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginBusiness)); // Login Business
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Account
router.patch("/update-business", authMiddleware, updateBusinessProfile); // Update Business Profile
router.get("/forgot-password/:businessEmail", tryCatch(forgotBusinessPassword)); // Forgot Password for Email Verification
router.patch("/reset-password", tryCatch(resetBusinessPassword)); // Update Business Password
router.patch("/change-password", authMiddleware, changeBusinessPassword); // Change Business Password
router.get("/isAvailable/:businessEmail", tryCatch(isBusinessAvailable)); // Check If Business Is Available

// For Web Application

router.get("/", tryCatch(getAllBusinesses)); // Get All Businesses
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateBusiness)); // Activate or Deactivate Business
router.delete("/delete/:businessEmail", tryCatch(deleteBusiness)); // Delete Business

// Optional

// router.get("/:email", tryCatch(getBusinessDetailsByEmail)); // Get Business Details By Email

export default router;

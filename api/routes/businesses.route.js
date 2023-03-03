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

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id for the customer
 *         profileImage:
 *           type: string
 *           description: The URL of the Profile Image
 *         firstName:
 *           type: string
 *           description: First Name of the Customer
 *         lastName:
 *           type: string
 *           description: Last Name of the Customer
 *         email:
 *           type: string
 *           description: Email of the Customer
 *         password:
 *           type: string
 *           description: Encrypted Password of the Customer
 *         isActive:
 *           type: boolean
 *           description: Status whether Active or Not
 *         isEmailVerfified:
 *           type: boolean
 *           description: Status whether Email is Verified or Not
 *         otp:
 *           type: number
 *           description: 4 Digit OTP for Email Verification & Password Recovery
 *       example:
 *         _id: 63ee14c0648ddef3dc380288
 *         profileImage: ""
 *         firstName: Rahul
 *         lastName: Rauniyar
 *         email: rahul@otssoultions.com
 *         password: "$2a$10$6JAuTxw61ph/Ut2U1A8QBu5.awb0asMyK3kYCgRLASDJNqv83rd4O"
 *         phoneNumber: "+918546001170"
 *         isActive: true
 *         isEmailVerfied: true
 *         otp: 4532
 *
 */

// For Web Application

router.get("/", tryCatch(getAllBusinesses)); // Get All Businesses
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateBusiness)); // Activate or Deactivate Business
router.delete("/delete/:businessEmail", tryCatch(deleteBusiness)); // Delete Business

// For Mobile Application

router.post("/signup", tryCatch(addNewBusiness)); // Add New Business
router.get("/resend-otp/:businessEmail", tryCatch(resendEmailVerificationOTP)); // Resend OTP for Email Verification
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginBusiness)); // Login Business
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Business Account
router.patch("/update-business", authMiddleware, updateBusinessProfile); // Update Business Profile
router.get("/forgot-password/:businessEmail", tryCatch(forgotBusinessPassword)); // Forgot Password for Email Verification
router.patch("/reset-password", tryCatch(resetBusinessPassword)); // Update Business Password
router.patch("/change-password", authMiddleware, changeBusinessPassword); // Change Business Password
router.get("/isAvailable/:businessEmail", tryCatch(isBusinessAvailable)); // Check If Business Is Available
router.get("/:email", tryCatch(getBusinessDetailsByEmail)); // Get Business Details By Email

export default router;

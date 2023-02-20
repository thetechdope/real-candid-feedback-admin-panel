import express from "express";
import {
  addNewCustomer,
  verifyEmail,
  resendEmailVerificationOTP,
  loginCustomer,
  updateCustomerProfile,
  getAllCustomers,
  activateOrDeactivateCustomer,
  deleteCustomer,
  getAllVerifiedCustomers,
  deleteAccount,
  forgotCustomerPassword,
  updateCustomerPassword
} from "../controllers/customers.controller.js";
import tryCatch from "../utils/tryCatch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* For Mobile Application */

router.post("/signup", tryCatch(addNewCustomer)); // Add New Customer
router.get("/resend-otp/:email",authMiddleware,tryCatch(resendEmailVerificationOTP)); // Resend OTP for Email Verification
router.get("/forgot-password/:email",tryCatch(forgotCustomerPassword)); // Forgot password for Email Verification
router.patch("/update-password/:email",tryCatch(updateCustomerPassword)) //update Customer Password
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginCustomer)); // Login Customer
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Account
router.patch("/update-customer/:email", tryCatch(updateCustomerProfile)); // Update Customer Profile

/* For Web Application */

router.get("/", tryCatch(getAllCustomers)); // Get All Customers
// router.patch("/activate-deactivate", tryCatch(activateOrDeactivateCustomer)); // Activate or Deactivate Customer
router.delete("/delete/:email", tryCatch(deleteCustomer)); // Delete Customer

/* Optional */

// router.get("/verified", tryCatch(getAllVerifiedCustomers)); // Get All Verified Customers

export default router;

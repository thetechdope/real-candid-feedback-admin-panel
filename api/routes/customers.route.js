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
  deleteAccount,
  forgotCustomerPassword,
  resetCustomerPassword,
  changeCustomerPassword,
} from "../controllers/customers.controller.js";
import tryCatch from "../utils/tryCatch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* For Mobile Application */

router.post("/signup", tryCatch(addNewCustomer)); // Add New Customer
router.get("/resend-otp", authMiddleware, tryCatch(resendEmailVerificationOTP)); // Resend OTP for Email Verification
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginCustomer)); // Login Customer
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Account
router.patch(
  "/update-customer",
  authMiddleware,
  tryCatch(updateCustomerProfile)
); // Update Customer Profile
router.get("/forgot-password/:email", tryCatch(forgotCustomerPassword)); // Forgot password for Email Verification
router.patch("/reset-password", tryCatch(resetCustomerPassword)); // Reset Customer Password
router.patch("/change-password", authMiddleware, changeCustomerPassword); // Change Customer Password

/* For Web Application */

router.get("/", tryCatch(getAllCustomers)); // Get All Customers
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateCustomer)); // Activate or Deactivate Customer
router.delete("/delete/:email", tryCatch(deleteCustomer)); // Delete Customer

export default router;

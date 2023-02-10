import express from "express";
import {
  getAllCustomers,
  getAllVerifiedCustomers,
  addNewCustomer,
  verifyEmail,
  deleteCustomer,
  resetPassword,
  CustomerLogin
} from "../controllers/customers.controller.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

const router = express.Router();

// Get All Customers
router.get("/", getAllCustomers);

// Get All Verified Customers
router.get("/verified", getAllVerifiedCustomers);

// Send OTP for Email Verification
router.get("/send-verify-email-otp", (req, res) => {});

// Add New Customer
router.post("/", UploadProfileImage, addNewCustomer);

// Verify Email
router.patch("/verify-email", verifyEmail);

// Reset Password
router.patch("/reset-password/:id", resetPassword);

// Delete Customer
router.delete("/delete/:id", deleteCustomer);

// Customer Login
router.post("/login", CustomerLogin);

export default router;

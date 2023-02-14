import express from "express";
import {
  getAllCustomers,
  getAllVerifiedCustomers,
  addNewCustomer,
  loginCustomer,
  verifyEmail,
  updateCustomerProfile,
} from "../controllers/customers.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

const router = express.Router();

// Add New Customer
router.post("/", addNewCustomer);

router.post("/login", loginCustomer);

// Get All Customers
router.get("/", getAllCustomers);

// Get All Verified Customers
router.get("/verified", getAllVerifiedCustomers);

// update Customer profile
router.patch("/:email", updateCustomerProfile);

// Verify Email
router.patch("/verify-email", verifyEmail);

// Update Customer profile
// router.patch("/:email", updateCustomerProfile);

// Reset Password
router.patch("/reset-password/:id", resetPassword);

// Delete Customer
router.delete("/delete/:id", deleteCustomer);

// Customer Login
router.post("/login", CustomerLogin);

export default router;

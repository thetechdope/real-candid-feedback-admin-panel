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
import UploadImageMiddleware from "../middlewares/upload-image.js";

const router = express.Router();

// Get All Customers
router.get("/", getAllCustomers);

// Get All Verified Customers
router.get("/verified", getAllVerifiedCustomers);

// Add New Customer
router.post("/", UploadImageMiddleware, addNewCustomer);

// Verify Email
router.patch("/verify-email", verifyEmail);

// Reset Password
router.patch("/reset-password/:id", resetPassword);

// Delete Customer
router.delete("/delete/:id", deleteCustomer);

// Customer Login
router.post("/login", CustomerLogin);

export default router;

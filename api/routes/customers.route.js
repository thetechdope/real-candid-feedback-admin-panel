import express from "express";
import {
  addNewCustomer,
  verifyEmail,
  loginCustomer,
  updateCustomerProfile,
  getAllCustomers,
  activateOrDeactivateCustomer,
  deleteCustomer,
  getAllVerifiedCustomers,
} from "../controllers/customers.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// For Mobile Application

router.post("/", tryCatch(addNewCustomer)); // Add New Customer
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginCustomer)); // Login Customer
// router.patch("update-customer/:email", tryCatch(updateCustomerProfile)); // Update Customer Profile

// For Web Application

router.get("/", tryCatch(getAllCustomers)); // Get All Customers
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateCustomer)); // Activate or Deactivate Customer
router.delete("/delete/:email", tryCatch(deleteCustomer)); // Delete Customer

// Optional

// router.get("/verified", tryCatch(getAllVerifiedCustomers)); // Get All Verified Customers

export default router;

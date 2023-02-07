import express from "express";
import {
  getAllCustomers,
  getAllVerifiedCustomers,
  addNewCustomer,
  verifyEmail,
} from "../controllers/customers.controller.js";

const router = express.Router();

// Get All Customers
router.route("/").get(getAllCustomers);

// Get All Verified Customers
router.route("/verified").get(getAllVerifiedCustomers);

// Add New Customer
router.route("/").post(addNewCustomer);

// Verify Email
router.route("/verify-email").patch(verifyEmail);

export default router;

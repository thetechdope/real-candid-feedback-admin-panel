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
// import UploadProfileImage from "../utils/UploadProfileImage.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// Add New Customer
router.post("/", tryCatch(addNewCustomer));

router.post("/login", tryCatch(loginCustomer));

// Get All Customers
router.get("/", tryCatch(getAllCustomers));

// Get All Verified Customers
router.get("/verified", tryCatch(getAllVerifiedCustomers));

// update Customer profile
router.patch("/:email", updateCustomerProfile);

// Verify Email
router.patch("/verify-email", tryCatch(verifyEmail));

// Update Customer profile
router.patch("update-customer/:email", tryCatch(updateCustomerProfile));



export default router;

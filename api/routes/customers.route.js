import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
	getAllCustomers,
	getAllVerifiedCustomers,
	addNewCustomer,
	verifyEmail,
	updateCustomerProfile,
} from "../controllers/customers.controller.js";
import UploadProfileImage from "../utils/UploadProfileImage.js";

const router = express.Router();

// Get All Customers
router.get("/", tryCatch(getAllCustomers));

// Get All Verified Customers
router.get("/verified", tryCatch(getAllVerifiedCustomers));

// Send OTP for Email Verification
router.get("/send-verify-email-otp", (req, res) => {});

// Add New Customer
// router.post("/", UploadImageMiddleware, tryCatch(addNewCustomer));

// update Customer profile
router.patch("/:email", tryCatch(updateCustomerProfile));

// Verify Email
router.patch("/verify-email", tryCatch(verifyEmail));

export default router;

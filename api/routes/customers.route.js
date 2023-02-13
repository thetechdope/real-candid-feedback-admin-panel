import express from "express";
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
router.get("/", getAllCustomers);

// Get All Verified Customers
router.get("/verified", getAllVerifiedCustomers);

// Send OTP for Email Verification
router.get("/send-verify-email-otp", (req, res) => {});

// Add New Customer
router.post("/", UploadProfileImage, addNewCustomer);

// update Customer profile
router.patch("/:email", updateCustomerProfile);

// Verify Email
router.patch("/verify-email", verifyEmail);

export default router;

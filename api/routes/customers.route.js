import express from "express";
import {
	getAllCustomers,
	getAllVerifiedCustomers,
	addNewCustomer,
	verifyEmail,
	updateCustomerProfile,
} from "../controllers/customers.controller.js";
import UploadImageMiddleware from "../middlewares/upload-image.js";

const router = express.Router();

// Get All Customers
router.get("/", getAllCustomers);

// Get All Verified Customers
router.get("/verified", getAllVerifiedCustomers);

// Add New Customer
router.post("/", UploadImageMiddleware, addNewCustomer);

// update Customer profile
router.patch("/:email", updateCustomerProfile);

// Verify Email
router.patch("/verify-email", verifyEmail);

export default router;

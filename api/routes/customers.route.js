import express from "express";
import tryCatch from "../utils/tryCatch.js";
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
router.get("/", tryCatch(getAllCustomers));

// Get All Verified Customers
router.get("/verified", tryCatch(getAllVerifiedCustomers));

// Add New Customer
router.post("/", UploadImageMiddleware,tryCatch(addNewCustomer));

// update Customer profile
router.patch("/:email", updateCustomerProfile);

// Verify Email
router.patch("/verify-email", tryCatch(verifyEmail));

export default router;

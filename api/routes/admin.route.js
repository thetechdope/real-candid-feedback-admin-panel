import express from "express";
import {
	loginAdmin,
	addNewAdmin,
	getAllAdmin,
	updateAdminProfile,
	forgotCustomerPassword,
	resetCustomerPassword,
	changeAdminPassword,
} from "../controllers/admin.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

/* For Mobile Application */
router.post("/signup", tryCatch(addNewAdmin)); // Add New Customer
router.post("/login", tryCatch(loginAdmin)); // Login Customer

router.get("/", tryCatch(getAllAdmin)); // Get All Customers

router.patch("/update-admin", tryCatch(updateAdminProfile)); // Update Admin Profile
router.get("/forgot-password/:email", tryCatch(forgotCustomerPassword)); // Forgot password for Email Verification
router.patch("/reset-password", tryCatch(resetCustomerPassword)); // Reset Customer Password
router.patch("/change-password", changeAdminPassword); // Change Customer Password

export default router;

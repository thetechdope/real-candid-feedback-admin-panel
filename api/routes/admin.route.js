import express from "express";
import {
  loginAdmin,
  addNewAdmin,
  getAllAdmin,
  updateCustomerProfile,
  forgotCustomerPassword,
  resetCustomerPassword,
  changeAdminPassword,
} from "../controllers/admin.controller.js"
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

/* For Mobile Application */
router.post("/signup", tryCatch(addNewAdmin)); // Add New Customer
router.post("/login", tryCatch(loginAdmin)); // Login Customer

router.get("/", tryCatch(getAllAdmin)); // Get All Customers

router.patch("/update-customer", tryCatch(updateCustomerProfile)); // Update Customer Profile
router.get("/forgot-password/:email", tryCatch(forgotCustomerPassword)); // Forgot password for Email Verification
router.patch("/reset-password", tryCatch(resetCustomerPassword)); // Reset Customer Password
router.patch("/change-password/:email",  changeAdminPassword); // Change Customer Password

export default router;

import express from "express";
import {
  getAllBusinesses,
  getBusinessDetailsByEmail,
  addNewBusiness,
  deleteBusiness,
  BusinessLogin,
  resetPassword
} from "../controllers/businesses.controller.js";

const router = express.Router();

// Get All Businesses
router.get("/", getAllBusinesses);

// Get Business Details By Email
router.get("/:email", getBusinessDetailsByEmail);

// Add New Customer
router.post("/", addNewBusiness);

// Reset Password
router.patch("/reset-password/:id", resetPassword);


// Delete Business
router.delete("/delete/:id", deleteBusiness);

// Login to Business
router.post("/login", BusinessLogin);


export default router;

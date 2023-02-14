import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
  getAllBusinesses,
  getBusinessDetailsByEmail,
  addNewBusiness,
  updateBusinessProfile,
  deleteBusiness,
  BusinessLogin,
  resetPassword,
} from "../controllers/businesses.controller.js";

const router = express.Router();

// Get All Businesses
router.get("/", tryCatch(getAllBusinesses));

// Get Business Details By Email
router.get("/:email", tryCatch(getBusinessDetailsByEmail));

// Update Business Profile
router.patch("/:email", tryCatch(updateBusinessProfile));

// Add New Customer
router.post("/", tryCatch(addNewBusiness));

// Reset Password
router.patch("/reset-password/:id", resetPassword);

// Delete Business
router.delete("/delete/:id", deleteBusiness);

// Login to Business
router.post("/login", BusinessLogin);

export default router;

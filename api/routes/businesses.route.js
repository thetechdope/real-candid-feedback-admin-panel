import express from "express";
import {
  loginBusiness,
  getAllBusinesses,
  getBusinessDetailsByEmail,
  addNewBusiness,
  updateBusinessProfile,
} from "../controllers/businesses.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Login Business
router.post("/login", loginBusiness);

// Get All Businesses
router.get("/", getAllBusinesses);

// Get Business Details By Email
router.get("/:email", getBusinessDetailsByEmail);

// // Update Business Profile
// router.patch("/:email", updateBusinessProfile);

// Add New Customer
router.post("/", addNewBusiness);

export default router;

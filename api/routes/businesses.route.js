import express from "express";
import {
	getAllBusinesses,
	getBusinessDetailsByEmail,
	addNewBusiness,
	updateBusinessProfile,
} from "../controllers/businesses.controller.js";

const router = express.Router();

// Get All Businesses
router.get("/", getAllBusinesses);

// Get Business Details By Email
router.get("/:email", getBusinessDetailsByEmail);

// Update Business Profile
router.patch("/:email", updateBusinessProfile);

// Add New Customer
router.post("/", addNewBusiness);

export default router;

import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
	getAllBusinesses,
	getBusinessDetailsByEmail,
	addNewBusiness,
	updateBusinessProfile,
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

export default router;

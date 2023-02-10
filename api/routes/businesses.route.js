import express from "express";
import {
  getAllBusinesses,
  getBusinessDetailsByEmail,
  addNewBusiness,
} from "../controllers/businesses.controller.js";

const router = express.Router();

// Get All Businesses
router.get("/", getAllBusinesses);

// Get Business Details By Email
router.get("/:email", getBusinessDetailsByEmail);

// Add New Customer
router.post("/", addNewBusiness);

export default router;

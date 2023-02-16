import express from "express";
import {
  addNewBusiness,
  verifyEmail,
  loginBusiness,
  updateBusinessProfile,
  getAllBusinesses,
  activateOrDeactivateBusiness,
  deleteBusiness,
  getBusinessDetailsByEmail,
} from "../controllers/businesses.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// For Mobile Application

router.post("/", tryCatch(addNewBusiness)); // Add New Business
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginBusiness)); // Login Business
// router.patch("/:email", updateBusinessProfile); // Update Business Profile

// For Web Application

router.get("/", tryCatch(getAllBusinesses)); // Get All Businesses
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateBusiness)); // Activate or Deactivate Business
router.delete("/delete/:businessEmail", tryCatch(deleteBusiness)); // Delete Business

// Optional

// router.get("/:email", tryCatch(getBusinessDetailsByEmail)); // Get Business Details By Email

export default router;

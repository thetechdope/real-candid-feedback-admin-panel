import express from "express";
import {
  loginBusiness,
  getAllBusinesses,
  getBusinessDetailsByEmail,
  addNewBusiness,
  updateBusinessProfile,
} from "../controllers/businesses.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// Login Business
router.post("/login", tryCatch(loginBusiness));

// Get All Businesses
router.get("/", tryCatch(getAllBusinesses));

// Get Business Details By Email
router.get("/:email", tryCatch(getBusinessDetailsByEmail));

// Update Business Profile
// router.patch("/:email", updateBusinessProfile);

// Add New Customer
router.post("/", tryCatch(addNewBusiness));

// Reset Password
// router.patch("/reset-password/:id", resetPassword);

// Delete Business
// router.delete("/delete/:id", deleteBusiness);

// Login to Business
// router.post("/login", BusinessLogin);

// router.post("/", tryCatch(addNewBusiness));
export default router;

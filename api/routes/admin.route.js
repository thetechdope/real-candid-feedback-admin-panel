import express from "express";
import {
  loginAdmin,
  addNewAdmin,
  getAllAdmin,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/admin.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

/* For Mobile Application */

router.post("/signup", tryCatch(addNewAdmin)); // Add New Admin
router.post("/login", tryCatch(loginAdmin)); // Login Admin
router.get("/", tryCatch(getAllAdmin)); // Get All Admin
router.patch("/update-admin", tryCatch(updateAdminProfile)); // Update Admin Profile
router.patch("/change-password", changeAdminPassword); // Change Admin Password

export default router;

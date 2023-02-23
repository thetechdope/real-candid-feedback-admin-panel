import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

// Get Dashboard Data
router.get("/", tryCatch(getDashboardData));

export default router;

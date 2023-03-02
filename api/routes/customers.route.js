import express from "express";
import {
  addNewCustomer,
  verifyEmail,
  resendEmailVerificationOTP,
  loginCustomer,
  updateCustomerProfile,
  getAllCustomers,
  activateOrDeactivateCustomer,
  deleteCustomer,
  deleteAccount,
  forgotCustomerPassword,
  resetCustomerPassword,
  changeCustomerPassword,
} from "../controllers/customers.controller.js";
import tryCatch from "../utils/tryCatch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id for the customer
 *         profileImage:
 *           type: string
 *           description: The URL of the Profile Image
 *         firstName:
 *           type: string
 *           description: First Name of the Customer
 *         lastName:
 *           type: string
 *           description: Last Name of the Customer
 *         email:
 *           type: string
 *           description: Email of the Customer
 *         password:
 *           type: string
 *           description: Encrypted Password of the Customer
 *         isActive:
 *           type: boolean
 *           description: Status whether Active or Not
 *         isEmailVerfified:
 *           type: boolean
 *           description: Status whether Email is Verified or Not
 *         otp:
 *           type: number
 *           description: 4 Digit OTP for Email Verification & Password Recovery
 *       example:
 *         _id: 63ee14c0648ddef3dc380288
 *         profileImage: ""
 *         firstName: Rahul
 *         lastName: Rauniyar
 *         email: rahul@otssoultions.com
 *         password: "$2a$10$6JAuTxw61ph/Ut2U1A8QBu5.awb0asMyK3kYCgRLASDJNqv83rd4O"
 *         phoneNumber: "+918546001170"
 *         isActive: true
 *         isEmailVerfied: true
 *         otp: 4532
 *
 */

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: The Customers managing API
 */

/* For Web Application */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Returns the list of all the customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get("/", tryCatch(getAllCustomers)); // Get All Customers

/**
 * @swagger
 * /api/customers/activate-deactivate:
 *   patch:
 *     summary: Admin can Activate or Deactivate Customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Activation/Deactivation Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Activation/Deactivation Failed or There is no customer associated with the given email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.patch("/activate-deactivate", tryCatch(activateOrDeactivateCustomer)); // Activate or Deactivate Customer

/**
 * @swagger
 * /api/customers/delete/{email}:
 *   delete:
 *     summary: Admin can Delete a Customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Deletion Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Deletion Failed or There is no customer associated with the given email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.delete("/delete/:email", tryCatch(deleteCustomer)); // Delete Customer

/* For Mobile Applications */

router.post("/signup", tryCatch(addNewCustomer)); // Add New Customer
router.get("/resend-otp/:email", tryCatch(resendEmailVerificationOTP)); // Resend OTP for Email Verification
router.patch("/verify-email", tryCatch(verifyEmail)); // Verify Email
router.post("/login", tryCatch(loginCustomer)); // Login Customer
router.delete("/delete-account", authMiddleware, tryCatch(deleteAccount)); // Delete Customer Account
router.patch(
  "/update-customer",
  authMiddleware,
  tryCatch(updateCustomerProfile)
); // Update Customer Profile
router.get("/forgot-password/:email", tryCatch(forgotCustomerPassword)); // Forgot password for Email Verification
router.patch("/reset-password", tryCatch(resetCustomerPassword)); // Reset Customer Password
router.patch("/change-password", authMiddleware, changeCustomerPassword); // Change Customer Password
router.patch(
  "/update-customer/",
  authMiddleware,
  tryCatch(updateCustomerProfile)
); // Update Customer Profile

export default router;

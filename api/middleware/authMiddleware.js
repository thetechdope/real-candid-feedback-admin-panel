import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import CustomersModel from "../models/customers.model.js";
import BusinessesModel from "../models/businesses.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decodedValue = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedValue.email) {
        // Get Customer from the token
        req.customer = await CustomersModel.findById(decodedValue.id).select(
          "-password"
        );
      } else if (decodedValue.businessEmail) {
        req.business = await BusinessesModel.findById(decodedValue.id).select(
          "-password"
        );
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default authMiddleware;

import CustomersModel from "../models/customers.model.js";
import BusinessesModel from "../models/businesses.model.js";
import FeedbacksModel from "../models/feedbacks.model.js";

export const getDashboardData = async (req, res) => {
  const getAllCustomers = await CustomersModel.find();
  const getAllBusinesses = await BusinessesModel.find();
  const getAllFeedbacks = await FeedbacksModel.find();

  res.json({
    allCustomersCount: getAllCustomers.length,
    allBusinesses: getAllBusinesses,
    allFeedbacks: getAllFeedbacks,
  });
};
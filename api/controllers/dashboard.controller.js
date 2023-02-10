import CustomersModel from "../models/customers.model.js";
import BusinessesModel from "../models/businesses.model.js";
import FeedbacksModel from "../models/feedbacks.model.js";

export const getDashboardData = async (req, res) => {
  const getCustomersData = await CustomersModel.find();
  const getBusinessesData = await BusinessesModel.find();
  const getFeedbacksData = await FeedbacksModel.find();

  res.json({
    customersCount: getCustomersData.length,
    businessesCount: getBusinessesData.length,
    feedbacksCount: getFeedbacksData.length,
  });
};

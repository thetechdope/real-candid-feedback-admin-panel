import FeedbacksModel from "../models/feedbacks.model.js";
import CustomersModel from "../models/customers.model.js";
import BusinessModel from "../models/businesses.model.js";

// Adding New Feedback
export const addNewFeedback = async (req, res) => {
  const {
    rating,
    feedback,
    customerEmail,
    businessEmail,
    isAnonymous,
    customerName,
    businessName,
    
  } = req.body;

  const customerDetails = await CustomersModel.findOne({
    email: customerEmail,
  });

  const businessDetails = await BusinessModel.findOne({
    businessEmail: businessEmail,
  });

  if (businessDetails) {
    if (businessDetails.isActive) {
      // Existing Customer
      if (!isAnonymous) {
        if (customerDetails) {
          if (customerDetails.isActive) {
            const addedFeedback = await FeedbacksModel.create({
              rating: rating,
              feedback: feedback,
              customerEmail: customerEmail,
              customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
              businessEmail: businessEmail,
              businessName: businessDetails.businessName,
              businessImage: businessDetails.businessImage,
            });
            addedFeedback.save();
            res.status(200);
            res.json({
              data: addedFeedback,
              message: `Feedback for '${businessDetails.businessName}' has been added by the customer '${customerDetails.firstName} ${customerDetails.lastName}'`,
            });
          } else {
            res.status(400);
            throw new Error(
              "Feedback not added! Sorry this Customer has been blocked by Admin."
            );
          }
        } else {
          res.status(400);
          throw new Error(
            "Feedback not added! Please send a valid Customer Email."
          );
        }
      } else {
        const addedFeedback = await FeedbacksModel.create({
          rating: rating,
          feedback: feedback,
          customerEmail: "Anonymous",
          businessEmail: businessEmail,
          isAnonymous: true,
        });
        addedFeedback.save();
        res.status(200);
        res.json({
          data: addedFeedback,
          message: `Feedback for '${businessDetails.businessName}' has been added anonymously!`,
        });
      }
    } else {
      res.status(400);
      throw new Error(
        "Feedback not added! Sorry this Business has been blocked by Admin."
      );
    }
  } else {
    res.status(400);
    throw new Error("Feedback not added! Please send a valid Business Email.");
  }
};

// Adding New Feedback
export const addNewAnonymousFeedback = async (req, res) => {
  const { rating, feedback, businessEmail } = req.body;

  const businessDetails = await BusinessModel.findOne({
    businessEmail: businessEmail,
  });

  if (businessDetails) {
    if (businessDetails.isActive) {
      const addedFeedback = await FeedbacksModel.create({
        rating: rating,
        feedback: feedback,
        customerEmail: "Anonymous",
        businessEmail: businessEmail,
        businessImage: businessDetails.businessImage,
        isAnonymous: true,
      });
      addedFeedback.save();
      res.status(200);
      res.json({
        data: addedFeedback,
        message: `Feedback for '${businessDetails.businessName}' has been added by an anonymous customer!`,
      });
    } else {
      res.status(400);
      throw new Error(
        "Feedback not added! Sorry this Business has been blocked by Admin."
      );
    }
  } else {
    res.status(400);
    throw new Error("Feedback not added! Please send a valid Business Email.");
  }
};

// Get All Feedbacks
export const getAllFeedbacks = async (req, res) => {
  const allFeedbacks = await FeedbacksModel.find();
  res.status(200).json(allFeedbacks);
};

// Get All Anonymous Feedbacks
export const getAllAnonymousFeedbacks = async (req, res) => {
  const allAnonymousFeedbacks = await FeedbacksModel.find({
    isAnonymous: true,
  });
  res.status(200).json(allAnonymousFeedbacks);
};

// Get Logged In Customer Feedbacks
export const getLoggedInCustomerFeedbacks = async (req, res) => {
  const { email } = req.customer;

  const getCustomersFeedbacks = await FeedbacksModel.find({
    customerEmail: email,
  });

  if (getCustomersFeedbacks.length === 0) {
    res.status(400);
    throw new Error("You don't have given any feedbacks.");
  }

  res.status(200);
  res.json(getCustomersFeedbacks);
};

// Get Logged In Business Feedbacks
export const getLoggedInBusinessFeedbacks = async (req, res) => {
  const { businessEmail } = req.business;

  const getBusinessFeedbacks = await FeedbacksModel.find({
    businessEmail: businessEmail,
  });

  if (getBusinessFeedbacks.length === 0) {
    res.status(400);
    throw new Error("There are no feedbacks for given business!");
  }

  res.status(200);
  res.json(getBusinessFeedbacks);
};

// Get Customer Feedbacks By Email
export const getCustomersFeedbacksByEmail = async (req, res) => {
  const { email } = req.params;
  const getCustomerFeedbacks = await FeedbacksModel.find({
    customerEmail: email,
  });

  if (getCustomerFeedbacks.length === 0) {
    res.status(400);
    throw new Error("You don't have given any feedbacks.");
  }

  res.status(200).json(getCustomerFeedbacks);
};

// Get Business Feedbacks By Email
export const getBusinessesFeedbacksByEmail = async (req, res) => {
  const { businessEmail } = req.params;
  const getBusinessFeedbacks = await FeedbacksModel.find({
    businessEmail,
  });

  if (getBusinessFeedbacks.length === 0) {
    res.status(400);
    throw new Error("There are no feedbacks for given business!");
  }

  res.status(200).json(getBusinessFeedbacks);
};

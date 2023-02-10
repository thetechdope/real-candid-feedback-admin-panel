import FeedbacksModel from "../models/feedbacks.model.js";

export const getAllFeedbacks = async (req, res) => {
  const response = await FeedbacksModel.find();
  res.status(200).json(response);
};

export const getCustomersFeedbacksByEmail = async (req, res) => {
  const { email } = req.params;
  const response = await FeedbacksModel.find({ customerEmail: email });
  res.status(200).json(response);
};

export const getBusinessesFeedbacksByEmail = async (req, res) => {
  const { email } = req.params;
  const response = await FeedbacksModel.find({ businessEmail: email });
  res.status(200).json(response);
};

export const addNewFeedback = async (req, res) => {
  const { rating, feedback, customerEmail, businessEmail, isAnonymous } =
    req.body;

  try {
    const addedFeedback = await FeedbacksModel.create({
      rating: rating,
      feedback: feedback,
      customerEmail: customerEmail,
      businessEmail: businessEmail,
      isAnonymous: isAnonymous,
    });
    addedFeedback.save();

    res.status(200);
    res.json(addedFeedback);
  } catch (error) {
    res.status(400);
    res.send(`Error : ${error}`);
  }
};

import FeedbacksModel from "../models/feedbacks.model.js";

export const getAllFeedbacks = async (req, res) => {
  const response = await FeedbacksModel.find();
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

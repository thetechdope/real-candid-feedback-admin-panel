import FeedbacksModel from "../models/feedbacks.model.js";
import CustomersModel from "../models/customers.model.js";
import BusinessModel from "../models/business.model.js";

export const getAllFeedbacks = async (req, res) => {
  const response = await FeedbacksModel.find();
  res.status(200).json(response);
};

export const addNewFeedback = async (req, res) => {
  const { rating, feedback, customerEmail, businessEmail, isAnonymous } =
    req.body;

  const checkForCustomer = await CustomersModel.find({ email: customerEmail });
  const checkForBusiness = await BusinessModel.find({businessEmail: businessEmail});

  //  ----------- for business registerd -------------------------------

  if (checkForBusiness.length > 0) {
    // ------------ code for registered customer -----------------------------
    if (checkForCustomer.length > 0) {
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
    } else {
      try {
        const addedFeedback = await FeedbacksModel.create({
          rating: rating,
          feedback: feedback,
          customerEmail: null,
          businessEmail: businessEmail,
          isAnonymous: true,
        });
        addedFeedback.save();
        res.status(200);
        res.json(addedFeedback);
      } catch (error) {
        res.status(400);
        res.send(`Error : ${error}`);
      }
    }
  } else {
    res.status(400);
    res.json({
      message: "Sorry this business does not exists",
    });
  }
};

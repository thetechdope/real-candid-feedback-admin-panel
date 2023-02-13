import FeedbacksModel from "../models/feedbacks.model.js";
import CustomersModel from "../models/customers.model.js";
import BusinessModel from "../models/businesses.model.js";

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
	const { rating, feedback, customerEmail, businessEmail, isAnonymous } = req.body;

	const checkForCustomer = await CustomersModel.find({ email: customerEmail });
	const checkForBusiness = await BusinessModel.find({
		businessEmail: businessEmail,
	});
	console.log(checkForBusiness);

	//  ----------- for business registered -------------------------------

	if (checkForBusiness[0].isActive) {
		// ------------ code for registered customer -----------------------------
		if (checkForCustomer[0].isActive) {
			if (!isAnonymous) {
				const addedFeedback = await FeedbacksModel.create({
					rating: rating,
					feedback: feedback,
					customerEmail: customerEmail,
					businessEmail: businessEmail,
					isAnonymous: isAnonymous,
				});
				addedFeedback.save();
				res.status(200);
				res.json({
					data: addedFeedback,
					message: `Congrats ${checkForCustomer[0].firstName} your feedback has been added.`,
				});
			} else {
				const addedFeedback = await FeedbacksModel.create({
					rating: rating,
					feedback: feedback,
					customerEmail: null,
					businessEmail: businessEmail,
					isAnonymous: true,
				});
				addedFeedback.save();
				res.status(200);
				res.json({
					data: addedFeedback,
					message: "Your feedback has been saved as anonymous",
				});
			}
		} else {
			res.status(400);
			throw new Error(
				"Your account has been blocked, you have not access to add feedback anymore,\n Please connect to admin for reactivating your account."
			);
		}
	} else {
		res.status(400);
		throw new Error("Sorry this business account has been blocked by admin.");
	}
};

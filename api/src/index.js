import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import sendgridmail from "@sendgrid/mail";
import CustomersRouter from "../routes/customers.route.js";
import BusinessesRouter from "../routes/businesses.route.js";
import FeedbacksRouter from "../routes/feedbacks.route.js";
import DashboardRouter from "../routes/dashboard.route.js";
import errorHandler from "../utils/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("./public"));

app.get("/email", (req, res) => {
	sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);

	const message = {
		to: "akshaykhurana02@gmail.com",
		from: "thetechdope.in@gmail.com", // Verified Account
		subject: "Hello from SendGrid!",
		text: "Hello from SendGrid!",
		html: "<h1>Hello from SendGrid</h1>",
	};

	sendgridmail
		.send(message)
		.then((response) => {
			console.log(response);
			res.send(`Email sent to ${message.to}`);
		})
		.catch((error) => {
			console.log(error);
			res.send("Not Sent");
		});
});

mongoose.set("strictQuery", false);
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Database Connected & Server running at http://localhost:${PORT}/`);
		});
	})
	.catch((e) => {
		console.log("Error - ", e);
	});

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);
app.use("/api/dashboard", DashboardRouter);
app.get("/", (req, res) => res.send("<h1>Welcome to Real Candid Feedback App</h1>"));
app.use(errorHandler);

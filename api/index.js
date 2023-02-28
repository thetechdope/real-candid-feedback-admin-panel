import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import CustomersRouter from "./routes/customers.route.js";
import BusinessesRouter from "./routes/businesses.route.js";
import FeedbacksRouter from "./routes/feedbacks.route.js";
import DashboardRouter from "./routes/dashboard.route.js";
import AdminRouter from "./routes/admin.route.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
import fileupload from "express-fileupload";

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = "mongodb+srv://dbuser:dbuser123@cluster0.mqay0af.mongodb.net/Real-Candid-Feedbacks-Application?retryWrites=true&w=majority";
// const MONGODB_URI = process.env.MONGODB_URI;


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

mongoose.set("strictQuery", false);
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Database Connected & Server running at PORT: ${PORT}/`);
		});
	})
	.catch((e) => {
		console.log("Database Not Connected, Error: ", e);
	});

app.get("/", (req, res) => {
	res.status(200);
	res.json({
		text: "Hello! This is Real Admin Feedback Application API.",
		status: true,
	});
});

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/admin", AdminRouter);

app.use(errorHandlerMiddleware);

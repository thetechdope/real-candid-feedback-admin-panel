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
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

const options = {
	definition: {
	  openapi: "3.0.0",
	  info: {
		title: "LogRocket Express API with Swagger",
		version: "1.0.0",
		description:
		  "This is a simple CRUD API application made with Express and documented with Swagger",
		contact: {
		  name: "feedback",
		},
	  },
	  servers: [
		{
		  url: "http://localhost:3001",
		},
	  ],
	},
	apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJSDoc(options);
  app.use("/api-docs",swaggerUi.serve,
	swaggerUi.setup(specs)
  );


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

// /**
//  *  @swagger
//  * /:
//  * get:
//  * 		summery : This api is for checking if get method is working or not.
//  * 		description: This api is for checking if get method is working or not.
//  * 		responses:
//  * 			200:
//  * 				description: to test get method.
//  */

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/admin", AdminRouter);

app.use(errorHandlerMiddleware);

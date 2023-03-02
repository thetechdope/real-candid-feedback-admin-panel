import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import CustomersRouter from "./routes/customers.route.js";
import BusinessesRouter from "./routes/businesses.route.js";
import FeedbacksRouter from "./routes/feedbacks.route.js";
import DashboardRouter from "./routes/dashboard.route.js";
import AdminRouter from "./routes/admin.route.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
import fileupload from "express-fileupload";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Configuring Swagger */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Candid Feedback Admin API",
      version: "1.0.0",
      description:
        "A simple Express Real Candid Feedback Admin API (1st March #1)",
    },
    servers: [
      {
        url: ["http://34.212.54.70:3000"],
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    text: "Hello! This is updated Real Admin Feedback Application API.",
    status: true,
  });
});

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/admin", AdminRouter);

app.use(errorHandlerMiddleware);

export default app;

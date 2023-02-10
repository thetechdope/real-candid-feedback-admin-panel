import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import CustomersRouter from "./routes/customers.route.js";
import BusinessesRouter from "./routes/business.route.js";
import FeedbacksRouter from "./routes/feedbacks.route.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(cors());


app.set("view engine", "ejs");
app.use(express.static("./public"));

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database Connected & Server running at http://localhost:${PORT}/`
      );
    });
  })
  .catch((e) => {
    console.log("Error - ", e);
  });

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);

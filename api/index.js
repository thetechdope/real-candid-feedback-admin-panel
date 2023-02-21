import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import sendgridmail from "@sendgrid/mail";
import CustomersRouter from "./routes/customers.route.js";
import BusinessesRouter from "./routes/businesses.route.js";
import FeedbacksRouter from "./routes/feedbacks.route.js";
import DashboardRouter from "./routes/dashboard.route.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
import fileupload from "express-fileupload";
import cloudinary from "cloudinary";

dotenv.config();

// Configuration
cloudinary.v2.config({
  cloud_name: "ducadrcbj",
  api_key: "873725482114457",
  api_secret: "BFFjPJh7qppU-upxvjGP0mje6yA",
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
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
    text: "Hello World",
    status: true,
  });
});

app.get("/email", (req, res) => {
  sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);

  const message = {
    to: "thetechdope.trainings@gmail.com",
    from: "thetechdope.in@gmail.com" /* Verified Account */,
    subject: "OTP",
    text: "Your OTP is 1967",
    html: "<p>Your OTP is 1967</p>",
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

app.post("/upload-image", (req, res) => {
  const file = req.files.avatar;

  cloudinary.v2.uploader.upload(file.tempFilePath, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Result -> ", res);
  });
});

app.use("/api/customers", CustomersRouter);
app.use("/api/businesses", BusinessesRouter);
app.use("/api/feedbacks", FeedbacksRouter);
app.use("/api/dashboard", DashboardRouter);

app.use(errorHandlerMiddleware);



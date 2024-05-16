import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import clinicsRoute from "./routes/clinics.js";
import roomsRoute from "./routes/rooms.js";
import vaccine from "./routes/vaccine.js";
import vaccine_userRoute from "./routes/vaccine_user.js";
import queueRoute from "./routes/queue.js";
import appointmentRoute from "./routes/appointment.js";
import expirationChecker from "./utils/expirationChecker.js";

dotenv.config();
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()
);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/clinics", clinicsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api", vaccine);
app.use("/api", vaccine_userRoute);
app.use("/api", queueRoute);
app.use("/api", appointmentRoute);

app.get("/hello", (req, res) => {
  res.end("Hello from the hello route");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to the backend.");
  expirationChecker(); 
});

export default app;
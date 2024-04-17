import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import clinicsRoute from "./routes/clinics.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import vaccine from "./routes/vaccine.js";
import vaccine_userRoute from "./routes/vaccine_user.js";
import queueRoute from "./routes/queue.js";
import appointmentRoute from "./routes/appointment.js";
import expirationChecker from "./utils/expirationChecker.js";

const app = express();
dotenv.config();

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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/clinics", clinicsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api", vaccine);
app.use("/api", vaccine_userRoute);
app.use("/api", queueRoute);
app.use("/api", appointmentRoute);

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


connect();
console.log("Connected to the backend.");
expirationChecker(); // Call the expiration checker function


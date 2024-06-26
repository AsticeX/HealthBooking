// routes/appointment.js

import express from "express";
import { getAppointment, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByUserId, getAppointmentsByUserName, getAppointmentById } from "../controllers/appointment.js";

const router = express.Router();

// GET all appointments
router.get("/appointment", getAppointment);

// POST create a new appointment
router.post("/appointment", createAppointment);

// PUT update an appointment by ID
router.put("/appointment/:id", updateAppointment);

// DELETE delete an appointment by ID
router.delete("/appointment/:id", deleteAppointment);

router.get("/appointment/:user_Id", getAppointmentsByUserId);
router.get("/appointment/auth/:hospital_user_Id", getAppointmentsByUserName);
router.get("/appointments/:id", getAppointmentById);

export default router;

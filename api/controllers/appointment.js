// controllers/appointmentController.js

import Appointment from "../models/Appointment.js";
import Queue from "../models/Queue.js";

// Controller function to get all appointments
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.find();
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    const { date, hospital_id, department, start_time, stop_time, ...rest } = req.body;

    let queue = await Queue.findOne({
      date: new Date(date),
      hospital_id,
      department,
      start_time,
      stop_time
    });

    if (queue) {
      if (queue.count >= queue.max_queue) {
        return res.status(400).json({ message: "Queue is full for the selected time slot" });
      } else {
        queue.count += 1;
        await queue.save();
      }
    } else {
      queue = new Queue({
        date: new Date(date),
        hospital_id,
        department,
        start_time,
        stop_time,
        max_queue: rest.max_queue,
        count: 1
      });
      await queue.save();
    }

    const appointment = new Appointment({
      date: new Date(date),
      hospital: hospital_id,
      department,
      start_time,
      stop_time,
      queue_Id: queue._id,
      ...rest
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};
export const updateAppointment = async (req, res, next) => {
  const appointmentId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updatedData, {
      new: true,
    });

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

// Controller function to delete an appointment by ID
export const deleteAppointment = async (req, res, next) => {
  const appointmentId = req.params.id;

  try {
    const deletedAppointment = await Appointment.findByIdAndRemove(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAppointmentsByUserId = async (req, res, next) => {
  try {
    const { user_Id } = req.params;
    // console.log(user_Id);
    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required in the query." });
    }

    const appointment = await Appointment.find({ user_Id });

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const getAppointmentsByUserName = async (req, res, next) => {
  try {
    const { user_name } = req.params;
    if (!user_name) {
      return res.status(400).json({ error: "User name is required in the query." });
    }

    const appointment = await Appointment.find({ user_name });

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

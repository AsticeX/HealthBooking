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

// Controller function to create a new appointment
export const createAppointment = async (req, res, next) => {
  try {
    const queueId = req.params.queue;
    const { date } = req.body; 

    // Find the queue by ID
    let queue = await Queue.findOne({ queueId });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const appointmentsOnDate = await Appointment.find({ queueId, date }).countDocuments();
    
    if (appointmentsOnDate >= queue.max_queue) {
      return res.status(400).json({ message: "Queue is full for the selected date" });
    }

    const availableSlots = queue.max_queue - appointmentsOnDate;

    const appointment = await Appointment.create({ ...req.body, queueId });
    await queue.save();
    return res.status(201).json({ appointment, availableSlots });
    } catch (err) {
    next(err);
  }
};

// export const getAvailableSlots = async (req, res, next) => {
//   try {
//     const queueId = req.params.queue;
//     const { date } = req.query; 


//     let queue = await Queue.findOne({ queueId });
//     if (!queue) {
//       return res.status(404).json({ message: "Queue not found" });
//     }


//     const appointmentsOnDate = await Appointment.find({ queueId, date }).countDocuments();
    
//     const availableSlots = queue.max_queue - appointmentsOnDate;

//     return res.status(200).json({ availableSlots });
//   } catch (err) {
//     next(err);
//   }
// };

// Controller function to update an appointment by ID
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
    const { hospital_user_Id } = req.params;
    if (!hospital_user_Id) {
      return res.status(400).json({ error: "User name is required in the query." });
    }

    const appointment = await Appointment.find({ hospital_user_Id });

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

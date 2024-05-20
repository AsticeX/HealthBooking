import Vaccine_Cal from "../models/Vaccine_Cal.js";

export const getAllVacCineCal = async (req, res, next) => {
  try {
    const vaccineCal = await Vaccine_Cal.find();
    res.json(vaccineCal);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
    next(err);
  }
};

export const addVaccineCal = async (req, res, next) => {
  try {
    const newVaccineCal = new Vaccine_Cal(req.body);
    const savedVaccineCal = await newVaccineCal.save();
    res.status(201).json(savedVaccineCal);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
    next(err);
  }
};

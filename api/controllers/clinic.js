import Clinic from "../models/Clinic.js";
import Room from "../models/Room.js";

export const createClinic = async (req, res, next) => {
  const newClinic = new Clinic(req.body);

  try {
    const savedClinic = await newClinic.save();
    res.status(200).json(savedClinic);
  } catch (err) {
    next(err);
  }
};
export const updateClinic = async (req, res, next) => {
  try {
    const updatedClinic = await Clinic.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedClinic);
  } catch (err) {
    next(err);
  }
};
export const deleteClinic = async (req, res, next) => {
  try {
    await Clinic.findByIdAndDelete(req.params.id);
    res.status(200).json("Clinic has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getClinic = async (req, res, next) => {
  try {
    const Clinics = await Clinic.findById(req.params.id);
    res.status(200).json(Clinics);
  } catch (err) {
    next(err);
  }
};
export const getClinics = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const ClinicId = await Clinic.find({
      ...others,
      // cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(ClinicId);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Clinic.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const ClinicCount = await Clinic.countDocuments({ type: "Clinic" });
    const apartmentCount = await Clinic.countDocuments({ type: "apartment" });
    const resortCount = await Clinic.countDocuments({ type: "resort" });
    const villaCount = await Clinic.countDocuments({ type: "villa" });
    const cabinCount = await Clinic.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Clinic", count: ClinicCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getClinicRooms = async (req, res, next) => {
  try {
    const Clinic = await Clinic.findById(req.params.id);
    const list = await Promise.all(
      Clinic.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getDepartmentsByClinicId = async (req, res, next) => {
  try {
    const { clinicId } = req.params;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }
    const departments = clinic.department;
    res.status(200).json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClinicById = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }
    res.status(200).json(clinic);
  } catch (err) {
    next(err);
  }
};

export const addToQueue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const clinic = await Clinic.findById(id);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    clinic.queue.push(data);

    await clinic.save();

    res.status(200).json({ message: "Data added to the queue successfully", clinic });
  } catch (err) {
    console.error("Error adding data to queue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClinicsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const clinics = await Clinic.find({ user_id: userId });

    if (!clinics || clinics.length === 0) {
      return res.status(404).json({ message: "No clinics found for this user" });
    }

    res.status(200).json(clinics);
  } catch (err) {
    console.error("Error fetching clinics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

import vaccine from "../models/Vaccine.js";

export const getVaccines = async (req, res, next) => {
  try {
    const vaccines = await vaccine.find();
    res.json(vaccines);
  } catch (err) {
    next(err);
  }
};
export const createVaccine = async (req, res, next) => {
  try {
    const newVaccine = await vaccine.create(req.body);
    res.status(201).json(newVaccine);
  } catch (err) {
    next(err);
  }
};

export const updateVaccine = async (req, res, next) => {
  const vaccineId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedVaccine = await vaccine.findByIdAndUpdate(vaccineId, updatedData, {
      new: true,
    });

    if (!updatedVaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.json(updatedVaccine);
  } catch (err) {
    next(err);
  }
};

export const deleteVaccine = async (req, res, next) => {
  const vaccineId = req.params.id;

  try {
    const deletedVaccine = await vaccine.findByIdAndRemove(vaccineId);

    if (!deletedVaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.json({ message: "Vaccine deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// exports.searchVaccineByName = async (req, res, next) => {
//   const { name } = req.query;

//   try {
//     const regex = new RegExp(`^${name}`, "i"); // 'i' for case-insensitive search
//     const vaccines = await vaccine.find({ vaccine_name: { $regex: regex } });
//     const names = vaccines.map((vaccine) => vaccine.vaccine_name);****
//     res.json(vaccines);
//     res.json(names);*****
//   } catch (err) {
//     next(err);
//   }
// };

export const searchVaccineByName = async (req, res, next) => {
  const { name } = req.params;

  try {
    const regex = new RegExp(`^${name}`, "i");
    const vaccines = await vaccine.find({ vaccine_name: { $regex: regex } });
    res.json(vaccines);
  } catch (err) {
    next(err);
  }
};

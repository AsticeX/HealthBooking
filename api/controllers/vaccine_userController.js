import vaccineUser from "../models/Vaccine_User.js";

export const getVaccineUser = async (req, res, next) => {
  try {
    const vaccine_user = await vaccineUser.find();
    res.json(vaccine_user);
  } catch (err) {
    next(err);
  }
};

export const createVaccineUser = async (req, res, next) => {
  try {
    const newVaccineUser = await vaccineUser.create(req.body);
    res.status(201).json(newVaccineUser);
  } catch (err) {
    next(err);
  }
};

export const updateVaccineUser = async (req, res, next) => {
  const vaccine_userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedVaccineUser = await vaccineUser.findByIdAndUpdate(vaccine_userId, updatedData, {
      new: true,
    });

    if (!updatedVaccineUser) {
      return res.status(404).json({ message: "Vaccine User not found" });
    }

    res.json(updatedVaccineUser);
  } catch (err) {
    next(err);
  }
};

export const deleteVaccineUser = async (req, res, next) => {
  const vaccine_userId = req.params.id;

  try {
    const deletedData = await vaccineUser.findByIdAndRemove(vaccine_userId);

    if (!deletedData) {
      return res.status(404).json({ message: "Vaccine User not found" });
    }

    res.json({ message: "Vaccine User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getVaccineUserByPriority = async (req, res, next) => {
  try {
    const vaccinesSortedByPriority = await vaccineUser.find().sort({ priority: 1 }); // Sorting by priority in ascending order

    res.json(vaccinesSortedByPriority);
  } catch (err) {
    next(err);
  }
};

export const getSingleVaccineUser = async (req, res, next) => {
  const vaccine_userId = req.params.id; // Assuming 'id' is the parameter for the Vaccine User record

  try {
    const vaccineUserRecord = await vaccineUser.findById(vaccine_userId);

    if (!vaccineUserRecord) {
      return res.status(404).json({ message: "Vaccine User not found" });
    }

    res.json(vaccineUserRecord);
  } catch (err) {
    next(err);
  }
};

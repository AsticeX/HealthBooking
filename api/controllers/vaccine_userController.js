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
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required in the query." });
    }

    const vaccinesSortedByPriority = await vaccineUser.find({ user_id }).sort({ priority: 1 });

    res.json(vaccinesSortedByPriority);
  } catch (err) {
    next(err);
  }
};

export const getSingleVaccineUser = async (req, res, next) => {
  const vaccine_userId = req.params.id;

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

// export const checkVaccineExpiration = async () => {
//   try {
//     console.log("Checking vaccine expiration...");
//     const expiredVaccines = await VaccineUser.find({ expire: { $lte: new Date() } });

//     if (expiredVaccines.length > 0) {
//       for (const vaccine of expiredVaccines) {
//         await VaccineUser.findByIdAndUpdate(vaccine._id, { priority: 0 });

//         // Retrieve user information associated with the expired vaccine
//         const user = await User.findOne({ _id: vaccine.user_id });

//         // Send email notification to the user about the expired vaccine
//         if (user) {
//           const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: "iceratana2@gmail.com",
//               pass: "hlpv samr eicn gzrj",
//             },
//           });

//           const mailOptions = {
//             from: "iceratana2@gmail.com",
//             to: user.email,
//             subject: "Expired Vaccine Notification",
//             html: `<p>Your vaccine (${vaccine.vaccine_name}) has expired. Please schedule a new vaccination appointment.</p>`,
//           };

//           transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//               console.log("Error sending email:", error);
//             } else {
//               console.log(`Email notification sent to ${user.email} about the expired vaccine.`);
//             }
//           });
//         }
//       }
//     } else {
//       console.log("No vaccines have expired.");
//     }
//   } catch (error) {
//     console.error("Error checking vaccine expiration:", error.message);
//   }
// };

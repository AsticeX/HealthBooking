import mongoose from "mongoose";

const VaccineSchema = new mongoose.Schema(
  {
    vaccine_name_th: String,
    vaccine_name_en: String,
    type: String,
    number_for_next_dose: Number,
    dose_require: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("vaccine", VaccineSchema);
import mongoose from "mongoose";

const VaccineUserSchema = new mongoose.Schema(
  {
    vaccine_name: String,
    expire: Date,
    attendance_date: Date,
    hospital_name: String,
    dose_user: Array,
    dose_require: Number,
    type: String,
    hospital: String,
    priority: Number,
    flag: Boolean,
  },
  { timestamps: true }
  
);

export default mongoose.model("vaccine_user", VaccineUserSchema);

import mongoose from "mongoose";

const VaccineUserSchema = new mongoose.Schema(
  {
    user_id: String,
    vaccine_name: String,
    expire: Date,
    attendance_date: Date,
    hospital_name: String,
    dose_user: Array,
    dose_require: Number,
    type: String,
    hospital: Array,
    priority: Number,
    flag: Boolean,
    expire_small: Array,
  },
  { timestamps: true }
);

export default mongoose.model("vaccine_user", VaccineUserSchema);

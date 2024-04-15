import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    hospital: String,
    department: Array,
    vaccine_name: Number,
  },
  { timestamps: true }
);

export default mongoose.model("appointment", AppointmentSchema);

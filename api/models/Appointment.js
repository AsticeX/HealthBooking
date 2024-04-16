import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    user_Id:String,
    lastname: String,
    hospital: String,
    department: Array,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("appointment", AppointmentSchema);

import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    hospital_user_Id: String,
    date: String,
    name: String,
    user_Id: String,
    user_name: String,
    queue: String,
    lastname: String,
    hospital: String,
    hospitalName: String,
    start_time: String,
    stop_time: String,
    department: Array,
    phone: String,
    status: {
      type: String,
      enum: ["Pending", "Complete", "Cancel"],
      default: "Pending",
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("appointment", AppointmentSchema);

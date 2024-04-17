import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    user_Id: String,
    queue: String,
    lastname: String,
    hospital: String,
    hospitalName: String,
    start_time: String,
    stop_time: String,
    department: Array,
    status: {
      type: String,
      enum: ['Pending', 'Complete', 'Cancel'],
      default: 'Pending'
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("appointment", AppointmentSchema);

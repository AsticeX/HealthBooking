import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema(
  {
    hospital_id: String,
    department: String,
    start_time: String,
    stop_time: String,
    max_queue: Number,
    count: Number,
    is_active: String,
  },
  { timestamps: true }
);

export default mongoose.model("queue", QueueSchema);

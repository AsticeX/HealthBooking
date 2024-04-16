import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema(
  {
    hospital_id: String,
    department: String,
    start_time: String,
    stop_time: String,
    max_queue: Number,
    count: {
      type: Number,
      default: 0,
    },
    is_active: String,
  },
  { timestamps: true }
);

export default mongoose.model("Queue", QueueSchema);

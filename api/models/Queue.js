import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema(
  {
    start_date: String,
    stop_date: String,
    max_queue: Number,
    count: Number,
    is_active: String,
  },
  { timestamps: true }
);

export default mongoose.model("queue", QueueSchema);

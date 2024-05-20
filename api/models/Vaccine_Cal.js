import mongoose from "mongoose";

const VaccineCalSchema = new mongoose.Schema({
  title: String,
  price: String,
  price_no_thb: Number,
  clinic: String,
  address: String,
  description_link: String,
  img: String,
});

export default mongoose.model("vaccine_cal", VaccineCalSchema);

import mongoose from "mongoose";
const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "hospital"
    // required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longtitude: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required:true
  },
  queue: {
    type: [String],
  },
  department: {
    type: [String],
  },
  // cheapestPrice: {
  //   type: Number,
  //   required: true,
  // },
  // featured: {
  //   type: Boolean,
  //   default: false,
  // },
});

export default mongoose.model("Clinic", ClinicSchema)
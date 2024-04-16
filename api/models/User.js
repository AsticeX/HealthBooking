import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    birthday: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    disease: {
      type: String,
      default:null,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    photo: {
      type: [String],    
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

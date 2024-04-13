import express from "express";
import {
  countByCity,
  countByType,
  createClinic,
  deleteClinic,
  getClinic,
  getClinicRooms,
  getClinics,
  updateClinic,
} from "../controllers/clinic.js";
// import Clinic from "../models/Clinic.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createClinic);

//UPDATE
router.put("/:id", verifyAdmin, updateClinic);
//DELETE
router.delete("/:id", verifyAdmin, deleteClinic);
//GET

router.get("/find/:id", getClinic);
//GET ALL

router.get("/", getClinics);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getClinicRooms);

export default router;

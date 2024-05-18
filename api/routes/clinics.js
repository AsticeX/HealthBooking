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
  getDepartmentsByClinicId,
  getClinicById,
  addToQueue,
  getClinicsByUserId,
} from "../controllers/clinic.js";

const router = express.Router();

//CREATE
router.post("/", createClinic);

//UPDATE
router.put("/:id", updateClinic);

//DELETE
router.delete("/:id", deleteClinic);

//GET
router.get("/find/:id", getClinic);

//GET ALL
router.get("/", getClinics);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getClinicRooms);

// GET Departments by Clinic ID
router.get("/:clinicId/departments", getDepartmentsByClinicId);
router.get("/auth/:userId", getClinicsByUserId);

router.get("/:id", getClinicById);
router.put("/:id/add-to-queue", addToQueue);

export default router;

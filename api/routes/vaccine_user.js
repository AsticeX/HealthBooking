import express from "express";
// import vaccineUserController from "../controllers/vaccine_userController.js";
import { getVaccineUser, createVaccineUser, updateVaccineUser, deleteVaccineUser, getVaccineUserByPriority, getSingleVaccineUser } from "../controllers/vaccine_userController.js";

const router = express.Router();

router.get("/vaccine_user", getVaccineUser);
router.post("/vaccine_user", createVaccineUser);
router.put("/vaccine_user/:id", updateVaccineUser);
router.delete("/vaccine_user/:id", deleteVaccineUser);
router.get("/vaccine_user/search-vaccine-user-by-priority", getVaccineUserByPriority);
router.get("/vaccine_user/search-single-vaccine-user/:id", getSingleVaccineUser);

export default router;

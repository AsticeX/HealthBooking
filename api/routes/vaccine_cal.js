import express from "express";
import { getAllVacCineCal, addVaccineCal } from "../controllers/vaccine_cal.js";

const router = express.Router();

router.get("/vaccine_cal", getAllVacCineCal);
router.post("/vaccine_cal", addVaccineCal);

export default router;

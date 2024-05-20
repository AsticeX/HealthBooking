import express from "express";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine, searchVaccineByName } from "../controllers/vaccineController.js";

const router = express.Router();

router.get("/vaccine", getVaccines);
router.post("/vaccine", createVaccine);
router.put("/vaccine/:id", updateVaccine);
router.delete("/vaccine/:id", deleteVaccine);
router.get("/vaccine/search-vaccine-by-name/:name", searchVaccineByName);

export default router;

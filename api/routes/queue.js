import express from "express";
import { getAllQueues, createQueue, updateQueue, deleteQueue, getQueuesByHospitalId } from "../controllers/queue.js";

const router = express.Router();

router.get("/queue", getAllQueues);
router.post("/queue", createQueue);
router.put("/queue/:id", updateQueue);
router.delete("/queue/:id", deleteQueue);
router.get("/queue_by_hospital_id/:hospital_id", getQueuesByHospitalId);

export default router;

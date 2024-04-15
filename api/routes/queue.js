import express from "express";
import { getAllQueues, createQueue, updateQueue, deleteQueue, getQueuesByHospitalId, getQueueById, getQueuesByUserId } from "../controllers/queue.js";

const router = express.Router();

router.get("/queue", getAllQueues);
router.post("/queue", createQueue);
router.get("/queue/:id", getQueueById); // Route to get a queue by its ID
router.put("/queue/:id", updateQueue);
router.delete("/queue/:id", deleteQueue);
router.get("/queue_by_hospital_id/:hospital_id", getQueuesByHospitalId);
router.get("/queue/auth/:user_id", getQueuesByUserId);

export default router;

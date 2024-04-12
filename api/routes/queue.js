import express from "express";
import { getAllQueues, createQueue, updateQueue, deleteQueue, getQueuesByUserId } from "../controllers/queue.js";

const router = express.Router();

// GET all queues
router.get("/queue", getAllQueues);

// POST create a new queue
router.post("/queue", createQueue);

// PUT update a queue by ID
router.put("/queue/:id", updateQueue);

// DELETE delete a queue by ID
router.delete("/queue/:id", deleteQueue);

router.get("/queue_by_user_id/:user_id", getQueuesByUserId);

export default router;

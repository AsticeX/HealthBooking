import Queue from "../models/Queue.js";

export const getAllQueues = async (req, res, next) => {
  try {
    const queues = await Queue.find();
    res.json(queues);
  } catch (err) {
    next(err);
  }
};

export const createQueue = async (req, res, next) => {
  try {
    const { hospital_id, department, start_time, stop_time, max_queue, count, is_active } = req.body;

    const newQueue = new Queue({
      hospital_id,
      department,
      start_time,
      stop_time,
      max_queue,
      count,
      is_active,
    });

    const createdQueue = await newQueue.save();

    res.status(201).json(createdQueue);
  } catch (err) {
    next(err);
  }
};

export const updateQueue = async (req, res, next) => {
  const queueId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedQueue = await Queue.findByIdAndUpdate(queueId, updatedData, {
      new: true,
    });

    if (!updatedQueue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    res.json(updatedQueue);
  } catch (err) {
    next(err);
  }
};

export const deleteQueue = async (req, res, next) => {
  const queueId = req.params.id;

  try {
    const deletedQueue = await Queue.findByIdAndRemove(queueId);

    if (!deletedQueue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    res.json({ message: "Queue deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getQueuesByHospitalId = async (req, res, next) => {
  try {
    const { hospital_id } = req.params;

    if (!hospital_id) {
      return res.status(400).json({ error: "Hospital ID is required in the query." });
    }

    const queues = await Queue.find({ hospital_id });

    res.json(queues);
  } catch (err) {
    next(err);
  }
};

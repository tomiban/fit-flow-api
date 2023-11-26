import Exercises from "../models/exercises.js";
import crudOperations from "../services/crudOperations.js";

const exerciseService = crudOperations(Exercises);

const checkData = async (req, res, next) => {
  const { name, category, userId } = req.body;
  try {
    if (!name || !category || !userId) {
      return res.status(400).json({ error: "Data missing" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const checkId = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "Id missing" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const checkUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ error: "Id missing" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const getExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getAll();
    res.status(200).json({ status: "success", data: exercises });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const createdExercise = await exerciseService.create(req.body);
    res.status(201).json({ status: "success", data: { createdExercise } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await exerciseService.getById(id);

    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExerciseByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("ESTE ES EL USER ID", userId);
    const exercise = await exerciseService.find({ userId: userId });
    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExercise = async (req, res) => {
  try {
    const exercise = await exerciseService.getById(req.body);

    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await exerciseService.update(id, req.body);
    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getExercises,
  createExercise,
  deleteExercise,
  updateExercise,
  checkData,
  getExerciseById,
  checkId,
  getExercise,
  getExerciseByUserID,
  checkUserId,
};

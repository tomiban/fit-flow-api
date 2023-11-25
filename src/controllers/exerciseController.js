import Exercises from "../models/exercises.js";
import genericServices from "../services/genericServices.js";
const checkData = async (req, res, next) => {
  const { name, category } = req.body;
  try {
    if (!name || !category) {
      return res.status(400).json({ error: "Data missing" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const getExercises = async (req, res) => {
  try {
    const exercises = await genericServices(Exercises).getAll();
    res.status(200).json({ status: "success", data: exercises });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const { name, actualWeigth, maxWeigth, instruction, link, category } =
      req.body;
    const createdExercise = await genericServices(Exercises).create({
      name,
      actualWeigth,
      maxWeigth,
      instruction,
      link,
      category,
    });
    res.status(201).json({ status: "success", data: { createdExercise } });
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
    res
      .status(200)
      .json({ status: "success", data: { exercise: { name: "biceps" } } });
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
};

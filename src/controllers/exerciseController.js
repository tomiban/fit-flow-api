const checkData = async (req, res, next) => {
  const { name, weigth } = req.body;
  try {
    if (!name || !weigth) {
      return res.status(400).json({ error: "Data missing" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const getExercises = async (req, res) => {
  try {
    const exercises = [{ name: "biceps" }, { name: "sentadilla" }];
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExercise = async (req, res) => {
  try {
    res
      .status(201)
      .json({ status: "success", data: { exercise: { name: "biceps" } } });
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

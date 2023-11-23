import express from "express";
import exerciseController from "../../controllers/exerciseController.js";

const router = express.Router();

router
  .get("/", exerciseController.getExercises)
  .post("/", exerciseController.checkData, exerciseController.createExercise)
  .delete("/:id", exerciseController.deleteExercise)
  .patch("/:id", exerciseController.updateExercise);

export default router;

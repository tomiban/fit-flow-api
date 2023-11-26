import express from "express";
import exerciseController from "../../controllers/exerciseController.js";

const router = express.Router();

router
  .get("/", exerciseController.getExercises)
  .get("/:id", exerciseController.checkId, exerciseController.getExerciseById)
  .get(
    "/users/:id",
    exerciseController.checkId,
    exerciseController.getExerciseByUserID
  )
  .post("/", exerciseController.checkData, exerciseController.createExercise)
  .delete("/:id", exerciseController.deleteExercise)
  .patch(
    "/:id",
    exerciseController.checkId,
    exerciseController.checkData,
    exerciseController.updateExercise
  );

export default router;

import express from "express";
import exerciseController from "../../controllers/exerciseController.js";

const router = express.Router();

router
  .get("/", exerciseController.getExercises)
  .get("/:id", exerciseController.checkId, exerciseController.getExerciseById)
  .get(
    "/users/:userId",
    exerciseController.checkUserId,
    exerciseController.getExerciseByUserID
  )
  .post("/", exerciseController.checkData, exerciseController.createExercise)
  .delete("/:id", exerciseController.checkId, exerciseController.deleteExercise)
  .patch(
    "/:id",
    exerciseController.checkId,
    exerciseController.checkDataToUpdate,
    exerciseController.updateExercise
  );

export default router;

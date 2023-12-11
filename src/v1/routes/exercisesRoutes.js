import express from "express";
import exerciseController from "../../controllers/exerciseController.js";
import {authMiddleware} from "../../middlewares/session.js";

const router = express.Router();

router
    .get("/", authMiddleware, exerciseController.getExercises)
    .get("/:id", exerciseController.checkId, exerciseController.getExerciseById)
    .get("/users/:userId", authMiddleware, exerciseController.checkUserId, exerciseController.getExerciseByUserID)
    .post("/", exerciseController.checkData, exerciseController.createExercise)
    .delete("/:id", exerciseController.checkId, exerciseController.deleteExercise)
    .patch("/:id", exerciseController.checkId, exerciseController.checkDataToUpdate, exerciseController.updateExercise);

export default router;

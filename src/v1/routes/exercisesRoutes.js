import express from "express";
import exerciseController from "../../controllers/exerciseController.js";
import {authMiddleware} from "../../middlewares/session.js";

const router = express.Router();

router
    .get("/", authMiddleware, exerciseController.getExercises)
    .get("/:id", authMiddleware, exerciseController.getExerciseById)
    .post("/", authMiddleware, exerciseController.createExercise)
    .delete("/:id", exerciseController.deleteExercise)
    .patch("/:id", exerciseController.updateExercise);

export default router;

import express from "express";
import {authMiddleware} from "../../middlewares/session.js";
import routineControllers from "../../controllers/routineControllers.js";

const router = express.Router();

router
    .get("/", authMiddleware, routineControllers.getRoutines)
    .get("/:id", authMiddleware, routineControllers.getRoutineById)
    .post("/", authMiddleware, routineControllers.createRoutine)
    .delete("/:id", authMiddleware, routineControllers.deleteRoutine)
    .patch("/:id", authMiddleware, routineControllers.updateRoutine)
    .get("/:id/:exeId", authMiddleware, routineControllers.getExerciseRoutine)
    .post("/:id", authMiddleware, routineControllers.createExerciseRoutine)
    .patch("/:id/:exeId", authMiddleware, routineControllers.updateExercisesRoutine)
    .delete("/:id/:exeId", authMiddleware, routineControllers.deleteExerciseRoutine);

export default router;

import express from "express";
import {authMiddleware} from "../../middlewares/session.js";
import routineControllers from "../../controllers/routineControllers.js";
import {validateSchema} from "../../middlewares/validator.js";
import {createRouSchema, updateRouSchema} from "../../schemaValidator/routineSchema.js";
import {createExeSchema, updateExeSchema} from "../../schemaValidator/exerciseSchema.js";

const router = express.Router();

router
    .get("/", authMiddleware, routineControllers.getRoutines)
    .get("/:id", authMiddleware, routineControllers.getRoutineById)
    .post("/", authMiddleware, validateSchema(createRouSchema), routineControllers.createRoutine)
    .delete("/:id", authMiddleware, routineControllers.deleteRoutine)
    .patch("/:id", authMiddleware, validateSchema(updateRouSchema), routineControllers.updateRoutine)
    .get("/:id/:exeId", authMiddleware, routineControllers.getExerciseRoutine)
    .post("/:id", authMiddleware, validateSchema(createExeSchema), routineControllers.createExerciseRoutine)
    .patch("/:id/:exeId", authMiddleware, validateSchema(updateExeSchema), routineControllers.updateExercisesRoutine)
    .delete("/:id/:exeId", authMiddleware, routineControllers.deleteExerciseRoutine);

export default router;

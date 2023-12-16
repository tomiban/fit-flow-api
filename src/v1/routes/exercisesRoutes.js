import express from "express";
import exerciseController from "../../controllers/exerciseController.js";
import {authMiddleware} from "../../middlewares/session.js";
import {validateSchema} from "../../middlewares/validator.js";
import {createExeSchema, updateExeSchema} from "../../schemaValidator/exerciseSchema.js";

const router = express.Router();

router
    .get("/", authMiddleware, exerciseController.getExercises)
    .get("/:id", authMiddleware, exerciseController.getExerciseById)
    .post("/", authMiddleware, validateSchema(createExeSchema), exerciseController.createExercise)
    .delete("/:id", authMiddleware, exerciseController.deleteExercise)
    .patch("/:id", authMiddleware, validateSchema(updateExeSchema), exerciseController.updateExercise);

export default router;

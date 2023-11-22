import express from "express";
import routineController from "../../controllers/routineController.js";

const router = express.Router();

router
	.get("/", routineController.getAllRoutines)
	.get("/:routineId", routineController.getRoutineById)
	.post("/", routineController.createNewRoutine)
	.patch("/:routineId", routineController.updateRoutine)
	.delete("/:routineId", routineController.deleteRoutine);

export default router;

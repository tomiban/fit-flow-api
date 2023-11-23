import express from "express";
import userController from "../../controllers/userController.js";

const router = express.Router();

router
	.get("/", userController.getAllUsers)
	.post("/", userController.createUser)
/* 	.get("/userId", usersController.getRoutineById)
	.patch("/:userId", usersController.updateRoutine)
	.delete("/:userId", usersController.deleteRoutine); */

export default router;

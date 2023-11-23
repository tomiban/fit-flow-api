import express from "express";
import userController from "../../controllers/userController.js";

const router = express.Router();

router
	.get("/", userController.getAllUsers)
	.post("/", userController.createUser)
	.patch("/:userId", userController.updateUser)
	.get("/:userId", userController.getUser)
	.delete("/:userId", userController.deleteUser);  

export default router;

import express from "express";
import userController from "../../controllers/userController.js";
import { validatorCreateUser, validatorUpdateUser } from "../../validators/user.js";
const router = express.Router();

router
	.get("/", userController.getAllUsers)
	.get("/:userId", userController.getUser)
	.post("/", validatorCreateUser, userController.createUser)
	.patch("/:userId", validatorUpdateUser, userController.updateUser)
	.delete("/:userId", userController.deleteUser);  

export default router;

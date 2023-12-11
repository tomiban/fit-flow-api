import express from "express";
import userController from "../../controllers/userController.js";
import {validatorUpdateUser, validatorIdUser} from "../../validators/user.js";
const router = express.Router();

router
    .get("/", userController.getAllUsers)
    .get("/:userId", validatorIdUser, userController.getUser)
    .patch("/:userId", validatorIdUser, validatorUpdateUser, userController.updateUser)
    .delete("/:userId", validatorIdUser, userController.deleteUser);

export default router;

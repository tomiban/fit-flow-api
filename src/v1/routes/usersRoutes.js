import express from "express";
import userController from "../../controllers/userController.js";
const router = express.Router();

router
    .get("/", userController.getAllUsers)
    .get("/:userId", userController.getUser)
    .patch("/:userId", userController.updateUser)
    .delete("/:userId", userController.deleteUser);

export default router;

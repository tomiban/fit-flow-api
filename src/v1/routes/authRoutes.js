import express from "express";
import {validatorLoginUser, validatorRegisterUser} from "../../validators/auth.js";

import authController from "../../controllers/authController.js";

const router = express.Router();

router
    .post("/register", validatorRegisterUser, authController.registerUser)
    .post("/login", validatorLoginUser, authController.loginUser)
    .post("/logout", authController.logoutUser);

export default router;

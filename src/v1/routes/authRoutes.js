import express from "express";

import authController from "../../controllers/authController.js";
import {validateSchema} from "../../middlewares/validator.js";
import {loginSchema, registerSchema} from "../../schemaValidator/authSchema.js";
import {sanitizeLogin, sanitizeRegister} from "../../middlewares/sanitize.js";
const router = express.Router();

router
    .post("/register", sanitizeRegister, validateSchema(registerSchema), authController.registerUser)
    .post("/login", sanitizeLogin, validateSchema(loginSchema), authController.loginUser)
    .post("/logout", authController.logoutUser);

export default router;

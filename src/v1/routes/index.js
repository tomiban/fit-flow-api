import express from "express";
import usersRoutes from "./usersRoutes.js";
import categoriesRoutes from "./categoriesRoutes.js";
import exercisesRoutes from "./exercisesRoutes.js";
import routinesRoutes from "./routinesRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/exercises", exercisesRoutes);
router.use("/routines", routinesRoutes);

export default router;

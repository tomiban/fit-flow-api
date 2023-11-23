import express from "express";
import routineRoutes from "./routinesRoutes.js";
import usersRoutes from "./usersRoutes.js";
import exercisesRoutes from "./exercisesRoutes.js";

const router = express.Router();

router.use("/routines", routineRoutes);
router.use("/users", usersRoutes);
// router.use("/categories", usersRoutes);
router.use("/exercises", exercisesRoutes);

export default router;

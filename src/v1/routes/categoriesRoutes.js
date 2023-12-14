import express from "express";
import categoriesControllers from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/", categoriesControllers.getCategories).post("/", categoriesControllers.createCategory);

export default router;

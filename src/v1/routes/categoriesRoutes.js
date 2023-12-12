import express from "express";
import categoriesControllers from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/category", categoriesControllers.getCategories).post("/", categoriesControllers.createCategory);

export default router;

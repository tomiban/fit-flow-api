import Category from "../models/category.js";

const createCategory = async (req, res) => {
    try {
        const createdCategory = await Category.create(req.body);
        res.status(201).json({status: "success", data: {createdCategory}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.status(200).json({
            status: "success",
            results: allCategories.length,
            data: {categories: allCategories},
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    createCategory,
    getCategories,
};

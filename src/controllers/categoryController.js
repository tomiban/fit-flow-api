import Category from "../models/category.js";
import crudOperations from "../services/crudOperations.js";

const categoryServices = crudOperations(Category);

const createCategory = async (req, res) => {
    try {
        const createdCategory = await categoryServices.create(req.body);
        res.status(201).json({status: "success", data: {createdCategory}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCategories = async (req, res) => {
    try {
        const allCategories = await categoryServices.getAll();
        res.status(200).json({
            status: "success",
            results: allCategories.length,
            data: {allCategories},
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    createCategory,
    getCategories,
};

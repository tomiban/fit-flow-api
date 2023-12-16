import httpStatus from "http-status";
import Category from "../models/category.js";
import {catchAsync} from "../utils/catchedAsync.js";
import {response} from "../utils/response.js";

const createCategory = catchAsync(async (req, res) => {
    const createdCategory = await Category.create(req.body);
    response(res, httpStatus.CREATED, createdCategory);
});

const getCategories = catchAsync(async (req, res) => {
    const allCategories = await Category.find();
    response(res, httpStatus.OK, allCategories);
});

export default {
    createCategory,
    getCategories,
};

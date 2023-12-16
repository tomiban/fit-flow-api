import httpStatus from "http-status";
import userServices from "../services/userServices.js";
import {catchAsync} from "../utils/catchedAsync.js";
import {response} from "../utils/response.js";
import {ApiError} from "../utils/errors.js";

const getAllUsers = catchAsync(async (req, res) => {
    const allUsers = await userServices.getAll();
    response(res, httpStatus.OK, allUsers);
});

const getUser = catchAsync(async (req, res) => {
    const {userId} = req.params;
    const user = await userServices.getById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    response(res, httpStatus.OK, user);
});

const updateUser = catchAsync(async (req, res) => {
    const {params, ...body} = req;
    const updatedUser = await userServices.update(params.userId, body);
    if (!updatedUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
    }
    response(res, httpStatus.OK, updatedUser);
});

const deleteUser = catchAsync(async (req, res) => {
    const {
        params: {userId},
    } = req;
    const userRemoved = await userServices.remove(userId);
    response(res, httpStatus.NO_CONTENT, userRemoved);
});

export default {
    getAllUsers,
    updateUser,
    getUser,
    deleteUser,
};

import httpStatus from "http-status";
import User from "../models/users.js";
import {ApiError} from "../utils/errors.js";
import mongoose from "mongoose";

const userServices = {
    getAll: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },

    getById: async itemId => {
        try {
            return await User.findById(itemId);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },

    getByUsername: async username => {
        try {
            return await User.findOne(username).select("+password");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },

    create: async itemData => {
        try {
            const newItem = new User(itemData);
            return await newItem.save();
        } catch (error) {
            if (error.code == 11000) {
                const duplicateKeyErrors = Object.keys(error.keyValue).map(key => ({
                    key,
                    value: error.keyValue[key],
                }));

                throw new ApiError(
                    httpStatus.CONFLICT,
                    duplicateKeyErrors.map(err => `Duplicate key errors: [${err.key}] ${err.value}`)
                );
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },

    update: async (itemId, updatedData) => {
        try {
            return await User.findByIdAndUpdate(itemId, updatedData, {
                new: true,
                runValidators: true,
            });
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },

    remove: async itemId => {
        try {
            return await User.delete({_id: itemId});
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
};

export default userServices;

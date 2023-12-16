import httpStatus from "http-status";
import Exercise from "../models/exercises.js";
import mongoose from "mongoose";
import {ApiError} from "../utils/errors.js";

const exercisesServices = {
    getAll: async userId => {
        try {
            return await Exercise.find({userId: userId});
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    getById: async (exerciseId, userId) => {
        try {
            return await Exercise.findOne({
                _id: exerciseId,
                userId: userId,
            });
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    create: async (exercise, userId) => {
        try {
            const newItem = new Exercise({userId, ...exercise});
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
    update: async (exerciseId, userId, updatedData) => {
        try {
            return await Exercise.findOneAndUpdate({_id: exerciseId, userId: userId.toString()}, updatedData, {
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
    remove: async (exercisesId, userId) => {
        try {
            return await Exercise.findOneAndDelete({_id: exercisesId, userId: userId.toString()});
        } catch (error) {
            console.log(error);
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
};

export default exercisesServices;

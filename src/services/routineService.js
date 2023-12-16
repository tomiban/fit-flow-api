import httpStatus from "http-status";
import mongoose from "mongoose";
import Exercise from "../models/exercises.js";
import Routine from "../models/routines.js";
import {ApiError} from "../utils/errors.js";

const routineServices = {
    getAll: async userId => {
        try {
            return await Routine.find({userId: userId});
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    getById: async (routineId, userId) => {
        try {
            return await Routine.findOne({
                _id: routineId,
                userId: userId,
            });
        } catch (error) {
            console.log(error, "entre");
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    create: async (routine, userId) => {
        try {
            const newItem = new Routine({userId, ...routine});

            return await newItem.save();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    update: async (routineId, userId, updatedData) => {
        try {
            return await Routine.findOneAndUpdate({_id: routineId, userId: userId.toString()}, updatedData, {
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
    remove: async (routineId, userId) => {
        try {
            return await Routine.findOneAndDelete({_id: routineId, userId: userId.toString()});
        } catch (error) {
            console.log(error);

            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    addExercise: async (routineId, userId, exerciseData) => {
        try {
            if (!exerciseData) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Exercise data is required");
            }

            const newExercise = new Exercise(exerciseData);

            const updatedRoutine = await Routine.findByIdAndUpdate(
                routineId,
                {$push: {exercises: newExercise}},
                {new: true}
            );
            return updatedRoutine || null;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    getExercise: async (routineId, exerciseId, userId) => {
        try {
            const exerciseMatched = await Routine.findOne(
                {
                    _id: routineId,
                    userId: userId.toString(),
                    "exercises._id": exerciseId,
                },
                {
                    "exercises.$": 1, // Proyecta solo el ejercicio que coincide con el exerciseId
                }
            );

            const exercise = exerciseMatched?.exercises[0];

            return exercise;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    updateExercise: async (routineId, exerciseId, userId, updatedData) => {
        try {
            const updateObject = {};

            // Construye el objeto de actualización solo para las propiedades proporcionadas
            Object.keys(updatedData).forEach(key => {
                updateObject[`exercises.$.${key}`] = updatedData[key];
            });

            const updatedRoutine = await Routine.findOneAndUpdate(
                {
                    _id: routineId,
                    userId: userId.toString(),
                    "exercises._id": exerciseId,
                },
                {$set: updateObject},
                {new: true} // Devuelve la rutina actualizada
            );

            return updatedRoutine;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
    removeExercise: async (routineId, exerciseId, userId) => {
        try {
            const updatedRoutine = await Routine.findOneAndUpdate(
                {
                    _id: routineId,
                    userId: userId.toString(),
                },
                {$pull: {exercises: {_id: exerciseId}}},
                {new: true}
            );

            return updatedRoutine;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id");
            }
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching data");
        }
    },
};

export default routineServices;

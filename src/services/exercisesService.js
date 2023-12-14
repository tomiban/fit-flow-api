import Exercise from "../models/exercises.js";

const exercisesServices = {
    getAll: async userId => {
        try {
            return await Exercise.find({userId: userId});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },
    getById: async (exerciseId, userId) => {
        try {
            return await Exercise.findOne({
                _id: exerciseId,
                userId: userId,
            });
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },
    create: async (exercise, userId) => {
        try {
            const newItem = new Exercise({userId, ...exercise});
            return await newItem.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (exerciseId, userId, updatedData) => {
        try {
            return await Exercise.findOneAndUpdate({_id: exerciseId, userId: userId.toString()}, updatedData, {
                new: true,
                runValidators: true,
            });
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },
    remove: async (exercisesId, userId) => {
        try {
            return await Exercise.findOneAndDelete({_id: exercisesId, userId: userId.toString()});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },
};

export default exercisesServices;

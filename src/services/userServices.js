import Exercise from "../models/exercises.js";

const userServices = {
    getExercises: async userId => {
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
    createExercises: async (exercise, userId) => {
        try {
            const newItem = new Exercise({userId, ...exercise});
            return await newItem.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default userServices;

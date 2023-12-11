import Exercises from "../models/exercises.js";

const userServices = {
    getExercises: async userId => {
        try {
            return await Exercises.findOne({userId: userId});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            console.log("errando");

            throw new Error(error.message);
        }
    },
};

export default userServices;

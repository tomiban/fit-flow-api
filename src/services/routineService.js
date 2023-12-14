import Exercise from "../models/exercises.js";
import Routine from "../models/routines.js";

const routineServices = {
    getAll: async userId => {
        try {
            return await Routine.find({userId: userId});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },
    getById: async (RoutineId, userId) => {
        try {
            return await Routine.findOne({
                _id: RoutineId,
                userId: userId,
            });
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },
    create: async (routine, userId) => {
        try {
            const newItem = new Routine({userId, ...routine});
            console.log(newItem);

            return await newItem.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    update: async (routineId, userId, updatedData) => {
        try {
            return await Routine.findOneAndUpdate({_id: routineId, userId: userId.toString()}, updatedData, {
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
            return await Routine.findOneAndDelete({_id: exercisesId, userId: userId.toString()});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },
    addExercise: async (routineId, userId, exerciseData) => {
        try {
            if (!exerciseData) throw new Error();

            const newExercise = new Exercise(exerciseData);

            const updatedRoutine = await Routine.findByIdAndUpdate(
                routineId,
                {$push: {exercises: newExercise}},
                {new: true}
            );
            return updatedRoutine || null;
        } catch (error) {
            throw new Error(error.message);
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
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
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
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
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
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },
};

export default routineServices;

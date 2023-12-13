import Exercises from "../models/exercises.js";
import crudOperations from "../services/crudOperations.js";
import userServices from "../services/userServices.js";

const exerciseService = crudOperations(Exercises);

const createExercise = async (req, res) => {
    try {
        const {body, user} = req;
        const createdExercise = await userServices.createExercises(body, user._id);
        res.status(201).json({status: "success", data: {createdExercise}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getExercises = async (req, res) => {
    try {
        const {username, _id} = req.user;
        const exercises = await userServices.getExercises(_id);
        res.status(200).json({
            status: "success",
            username,
            _id,
            results: exercises.length,
            data: exercises,
        });
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getExerciseById = async (req, res) => {
    try {
        const {id} = req.params;

        const {username, _id} = req.user;

        const exercise = await exerciseService.getById(id, _id);

        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                username,
                exercise,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateExercise = async (req, res) => {
    try {
        const {id: exerciseId} = req.params;
        const {_id: userId} = req.user;

        const exercise = await userServices.update(exerciseId, userId, req.body);
        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                exercise,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteExercise = async (req, res) => {
    try {
        const {id: exerciseId} = req.params;
        const {_id: userId} = req.user;

        const exercise = await userServices.remove(exerciseId, userId);

        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }

        res.status(204).json({status: "success", data: null});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    getExercises,
    createExercise,
    deleteExercise,
    updateExercise,
    getExerciseById,
};

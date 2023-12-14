import exercisesService from "../services/exercisesService.js";

const createExercise = async (req, res) => {
    try {
        const {body, user} = req;
        const {username, _id} = user;

        const createdExercise = await exercisesService.create(body, _id);

        res.status(201).json({status: "success", username, data: {createdExercise}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getExercises = async (req, res) => {
    try {
        const {username, _id} = req.user;
        const exercises = await exercisesService.getAll(_id);
        res.status(200).json({
            status: "success",
            username,
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

        const exercise = await exercisesService.getById(id, _id);

        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Exercise not found",
            });
        }

        res.status(200).json({
            status: "success",
            username,
            data: {
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
        const {_id: userId, username} = req.user;

        const exercise = await exercisesService.update(exerciseId, userId, req.body);
        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }
        res.status(200).json({
            status: "success",
            username,
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

        const exercise = await exercisesService.remove(exerciseId, userId);

        if (!exercise) {
            return res.status(404).json({
                status: "fail",
                message: "Exercise not found",
            });
        }

        res.status(200).json({status: "success", data: null});
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

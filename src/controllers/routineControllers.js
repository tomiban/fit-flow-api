import routineServices from "../services/routineService.js";

const createRoutine = async (req, res) => {
    try {
        const {body, user} = req;

        const {username, _id} = user;

        const createdRoutine = await routineServices.create(body, _id);

        res.status(201).json({status: "success", username, data: {routine: createdRoutine}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getRoutines = async (req, res) => {
    try {
        const {username, _id} = req.user;
        const routines = await routineServices.getAll(_id);
        res.status(200).json({
            status: "success",
            username,
            results: routines.length,
            data: routines,
        });
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getRoutineById = async (req, res) => {
    try {
        const {id: routineId} = req.params;

        const {username, _id} = req.user;

        const routine = await routineServices.getById(routineId, _id);

        if (!routine) {
            return res.status(404).json({
                status: "fail",
                message: "Routine not found",
            });
        }

        res.status(200).json({
            status: "success",
            username,
            data: {
                routine,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateRoutine = async (req, res) => {
    try {
        const {id: routineId} = req.params;
        const {_id: userId, username} = req.user;

        const routine = await routineServices.update(routineId, userId, req.body);
        if (!routine) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }
        res.status(200).json({
            status: "success",
            username,
            data: {
                routine,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteRoutine = async (req, res) => {
    try {
        const {id: routineId} = req.params;
        const {_id: userId} = req.user;

        const routine = await routineServices.remove(routineId, userId);

        if (!routine) {
            return res.status(404).json({
                status: "fail",
                message: "routine not found",
            });
        }

        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getExerciseRoutine = async (req, res) => {
    try {
        const {id: routineId, exeId} = req.params;
        const {_id: userId, username} = req.user;

        const exercise = await routineServices.getExercise(routineId, exeId, userId);

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
        console.log(error);
    }
};
const createExerciseRoutine = async (req, res) => {
    try {
        const {id: routineId} = req.params;
        const {_id: userId, username} = req.user;
        const {name, category} = req.body;

        if (!name || !category) {
            return res.status(400).json({
                status: "fail",
                message: "Name and Category are required",
            });
        }

        const newExercise = {
            name,
            category,
            ...req.body,
        };

        const createdExercise = await routineServices.addExercise(routineId, userId, newExercise);
        res.status(201).json({status: "success", username, data: {exercise: createdExercise}});
    } catch (error) {}
};
const updateExercisesRoutine = async (req, res) => {
    try {
        const {id: routineId, exeId} = req.params;
        const {_id: userId, username} = req.user;

        const routine = await routineServices.updateExercise(routineId, exeId, userId, req.body);
        if (!routine) {
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID",
            });
        }
        console.log(routine);
        res.status(200).json({
            status: "success",
            username,
            data: {
                routine,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteExerciseRoutine = async (req, res) => {
    try {
        const {id: routineId, exeId} = req.params;
        const {_id: userId} = req.user;

        const routine = await routineServices.removeExercise(routineId, exeId, userId);

        if (!routine) {
            return res.status(404).json({
                status: "fail",
                message: "Exercise not found",
            });
        }

        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    createRoutine,
    getRoutines,
    getRoutineById,
    updateRoutine,
    deleteRoutine,
    createExerciseRoutine,
    getExerciseRoutine,
    updateExercisesRoutine,
    deleteExerciseRoutine,
};

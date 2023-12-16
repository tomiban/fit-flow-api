import routineServices from "../services/routineService.js";
import {catchAsync} from "../utils/catchedAsync.js";
import {ApiError} from "../utils/errors.js";
import {response} from "../utils/response.js";
import httpStatus from "http-status";

const createRoutine = catchAsync(async (req, res) => {
    const {body, user} = req;
    const {_id} = user;
    const routine = await routineServices.create(body, _id);
    response(res, httpStatus.CREATED, routine);
});

const getRoutines = catchAsync(async (req, res) => {
    const {_id} = req.user;
    const routines = await routineServices.getAll(_id);
    response(res, httpStatus.OK, routines);
});

const getRoutineById = catchAsync(async (req, res) => {
    const {id: routineId} = req.params;
    const {_id} = req.user;
    const routine = await routineServices.getById(routineId, _id);
    if (!routine) {
        throw new ApiError(httpStatus.NOT_FOUND, "Routine not found");
    }
    response(res, httpStatus.OK, routine);
});

const updateRoutine = catchAsync(async (req, res) => {
    const {id: routineId} = req.params;
    const {_id: userId} = req.user;
    const routine = await routineServices.update(routineId, userId, req.body);
    if (!routine) {
        throw new ApiError(httpStatus.NOT_FOUND, "Routine not found");
    }
    response(res, httpStatus.OK, routine);
});

const deleteRoutine = catchAsync(async (req, res) => {
    const {id: routineId} = req.params;
    const {_id: userId} = req.user;
    const routine = await routineServices.remove(routineId, userId);
    response(res, httpStatus.NO_CONTENT, routine);
});

const getExerciseRoutine = catchAsync(async (req, res) => {
    const {id: routineId, exeId} = req.params;
    const {_id: userId} = req.user;
    const exercise = await routineServices.getExercise(routineId, exeId, userId);
    response(res, 200, exercise);
});

const createExerciseRoutine = catchAsync(async (req, res) => {
    const {id: routineId} = req.params;
    const {_id: userId} = req.user;
    const {name, category} = req.body;

    const newExercise = {
        name,
        category,
        ...req.body,
    };

    const exercise = await routineServices.addExercise(routineId, userId, newExercise);
    response(res, httpStatus.CREATED, exercise);
});
const updateExercisesRoutine = catchAsync(async (req, res) => {
    const {id: routineId, exeId} = req.params;
    const {_id: userId} = req.user;
    const routine = await routineServices.updateExercise(routineId, exeId, userId, req.body);
    response(res, httpStatus.OK, routine);
});

const deleteExerciseRoutine = catchAsync(async (req, res) => {
    const {id: routineId, exeId} = req.params;
    const {_id: userId} = req.user;
    const routine = await routineServices.removeExercise(routineId, exeId, userId);
    response(res, httpStatus.NO_CONTENT, routine);
});

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

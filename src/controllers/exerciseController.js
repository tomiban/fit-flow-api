import httpStatus from "http-status";
import exercisesService from "../services/exercisesService.js";
import {catchAsync} from "../utils/catchedAsync.js";
import {ApiError} from "../utils/errors.js";
import {response} from "../utils/response.js";

const createExercise = catchAsync(async (req, res) => {
    const {body, user} = req;
    const {_id} = user;
    const createdExercise = await exercisesService.create(body, _id);
    response(res, httpStatus.CREATED, createdExercise);
});

const getExercises = catchAsync(async (req, res) => {
    const {_id} = req.user;
    const exercises = await exercisesService.getAll(_id);
    response(res, httpStatus.OK, exercises);
});

const getExerciseById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    const exercise = await exercisesService.getById(id, _id);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, "Exercise not found");
    }
    response(res, httpStatus.OK, exercise);
});

const updateExercise = catchAsync(async (req, res) => {
    const {id: exerciseId} = req.params;
    const {_id: userId} = req.user;
    const exercise = await exercisesService.update(exerciseId, userId, req.body);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, "Exercise not found");
    }
    response(res, httpStatus.OK, exercise);
});

const deleteExercise = catchAsync(async (req, res) => {
    const {id: exerciseId} = req.params;
    const {_id: userId} = req.user;
    const exercise = await exercisesService.remove(exerciseId, userId);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, "Exercise not found");
    }
    response(res, httpStatus.OK, null);
});
export default {
    getExercises,
    createExercise,
    deleteExercise,
    updateExercise,
    getExerciseById,
};

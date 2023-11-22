// services/rutinaService.js
import Rutina from "../models/rutina.js";
import mongoose from 'mongoose'

const getAllRoutines = async () => {
	try {
		const allRoutines = await Rutina.find();
		return allRoutines;
	} catch (error) {
		console.error("Error al obtener todas las rutinas:", error);
		throw error;
	}
};

const getRoutineById = async (routineId) => {
	try {
		const routine = await Rutina.findById(routineId);
		return routine;
	} catch (error) {
		console.error("Error al obtener la rutina por ID:", error);
		throw error;
	}
};

const createNewRoutine = async (routine) => {
	try {
		const newRoutine = new Rutina({
			...routine,
		});
		const createdRoutine = await newRoutine.save();
		return createdRoutine;
	} catch (error) {
		console.error("Error al crear una nueva rutina:", error);
		throw error;
	}
};

const updateRoutine = async (routineId, changes) => {
	try {
		const updatedRoutine = await Rutina.findByIdAndUpdate(routineId, changes, {
			new: true,
		});
		return updatedRoutine;
	} catch (error) {
		console.error("Error al actualizar la rutina:", error);
		throw error;
	}
};

const deleteRoutine = async (routineId) => {
	try {
		const deletedRoutine = await Rutina.findByIdAndDelete(routineId);
		return deletedRoutine;
	} catch (error) {
		console.error("Error al eliminar la rutina:", error);
		throw error;
	}
};

export default {
	getAllRoutines,
	getRoutineById,
	createNewRoutine,
	updateRoutine,
	deleteRoutine,
};

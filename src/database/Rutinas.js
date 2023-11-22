import fs from "fs/promises";
import path from "path";

const rutaArchivo = path.join("src", "database", "db.json");

const leerArchivoJson = async () => {
	try {
		const contenidoJson = await fs.readFile(rutaArchivo, "utf-8");
		return JSON.parse(contenidoJson);
	} catch (error) {
		console.error("Error al leer el archivo JSON:", error);
		throw error;
	}
};

const guardarArchivoJson = async (datos) => {
	try {
		// Convierte los datos a formato JSON
		const contenidoJson = JSON.stringify(datos, null, 2);

		// Escribe el contenido JSON en el archivo
		await fs.writeFile(rutaArchivo, contenidoJson, "utf-8");
	} catch (error) {
		console.error("Error al guardar el archivo JSON:", error);
		throw error;
	}
};

const getAllRoutinesDb = async () => {
	try {
		const datos = await leerArchivoJson();

		return datos.workouts;
	} catch (error) {
		console.error("Error al obtener todas las rutinas:", error);
		throw error;
	}
};

const getRoutineById = async (workoutId) => {
	try {
		const datos = await leerArchivoJson();
		console.log(datos);

		const routine = datos.workouts?.find((workout) => workout.id === workoutId);

		return routine;
	} catch (error) {
		console.error("Error al obtener todas las rutinas:", error);
		throw error;
	}
};

const createNewRoutine = async (newRoutine) => {
	try {
		const datos = await leerArchivoJson();

		const isAlreadyWorkout = datos.workouts.find(
			(routine) => routine.name === newRoutine.name
		);

		if (isAlreadyWorkout) {
			throw {
				status: 400,
				message: `Workout ${newRoutine.name} already exists`,
			};
		}

		datos.workouts.push(newRoutine);

		await guardarArchivoJson(newRoutine);

		return newRoutine;
	} catch (error) {
		throw { status: 500, message: error?.message || error };
	}
};

const updateRoutine = async (routineId, changes) => {
	try {
		const datos = await leerArchivoJson();
		const index = datos.workouts.findIndex(
			(workout) => workout.id === routineId
		);

		if (index !== -1) {
			// Si se encontró el elemento, actualiza sus propiedades
			const updatedRoutine = {
				...datos.workouts[index],
				...changes,
				updatedAt: new Date().toLocaleString("es-AR", {
					timeZone: "America/Argentina/Buenos_Aires",
				}),
			};

			datos.workouts[index] = updatedRoutine;

			await guardarArchivoJson(datos);

			return updatedRoutine;
		}
	} catch (error) {
		console.error("Error al obtener todas las rutinas:", error);
		throw error;
	}
};

const deleteRoutine = async (routineId) => {
	try {
		const datos = await leerArchivoJson();
		const routinesFiltered = datos.workouts.filter(
			(workout) => workout.id !== routineId
		);
		await guardarArchivoJson(routinesFiltered);
		return routinesFiltered;
	} catch (error) {
		console.error("Error al obtener todas las rutinas:", error);
		throw error;
	}
};

export default {
	getAllRoutinesDb,
	createNewRoutine,
	getRoutineById,
	updateRoutine,
	deleteRoutine,
};

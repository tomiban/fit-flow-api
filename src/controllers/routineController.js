import routineService from "../services/routineService.js";

const getAllRoutines = async (req, res) => {
	try {
		const allRoutines = await routineService.getAllRoutines();
		res.status(201).send({ status: "OK", data: allRoutines });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({status: "FAILED", data:{error: error?.message ||  error}})
	}
};

const getRoutineById = async (req, res) => {
	const {
		params: { routineId },
	} = req;

	const routine = await routineService.getRoutineById(routineId);

	if (!routine) {
		// Si routine es undefined, significa que no se encontró una rutina con ese ID
		res.status(404).send({
			status: "Error",
			message: `No se encontró una rutina con el ID ${routineId}`,
		});
	} else {
		// Si routine tiene un valor, significa que se encontró la rutina y puedes proceder
		res.status(200).send({ status: "OK", data: routine });
	}
};

const createNewRoutine = async (req, res) => {
	const { body } = req;

	if (
		!body.user ||
		!body.name ||
		!body.category ||
		!body.exercises ||
		!body.trainerTips
	) {
		return res.status(400).send({
			status: "FAILED",

			message: "Faltan campos obligatorios en la solicitud.",
		});
	}

	const newRoutine = {
		user: body.user,
		name: body.name,
		category: body.category,
		exercises: body.exercises,
		trainerTips: body.trainerTips,
	};

	try {
		const createdNewRoutine = await routineService.createNewRoutine(newRoutine);

		res.status(201).send({ status: "OK", data: createdNewRoutine });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateRoutine = async (req, res) => {
	const {
		body,
		params: { routineId },
	} = req;

	if (!routineId) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter 'routineId' is required",
			},
		});
	}

	try {
		const updateRoutine = await routineService.updateRoutine(routineId, body);

		res.send({ status: "OK", data: updateRoutine });
	} catch (error) {}
};
const deleteRoutine = async (req, res) => {
	const {
		params: { routineId },
	} = req;

	if (!routineId) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter 'routineId' is required",
			},
		});
	}

	const routines = await routineService.deleteRoutine(req.params.routineId);
	console.log(routines);

	res.send({ status: "OK", data: routines });
};

export default {
	getAllRoutines,
	getRoutineById,
	createNewRoutine,
	updateRoutine,
	deleteRoutine,
};

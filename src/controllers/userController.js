// userController.js

import createService from "../services/crudOperations.js";
import User from "../models/users.js";
import { matchedData } from "express-validator";

const userService = createService(User);

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await userService.getAll();
		res.status(200).json({
			status: "success",
			results: allUsers.length,
			data: {
				allUsers,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		req = matchedData(req);

		const { userId } = req;

		const user = await userService.getById(userId);

		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "Invalid ID",
			});
		}

		res.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const body = matchedData(req);

		const newUser = await userService.create(body);
		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		req = matchedData(req);
		const { userId, ...body } = req;

		const updatedUser = await userService.update(userId, body);

		if (!updatedUser) {
			return res.status(400).json({
				status: "fail",
				data: {
					error: "Invalid ID",
				},
			});
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const {
			params: { userId },
		} = req;

		const userRemoved = await userService.remove(userId);

		if (!userRemoved) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid ID",
			});
		}

		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default {
	getAllUsers,
	createUser,
	updateUser,
	getUser,
	deleteUser,
};

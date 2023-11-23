// userController.js

import createService from "../services/genericServices.js";
import User from "../models/users.js";

const userService = createService(User);

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await userService.getAll();
		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const {
			params: { userId },
		} = req;

		const user = await userService.getById(userId);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const newUser = await userService.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const {
			body,
			params: { userId },
		} = req;

		if (!userId) {
			res.status(400).json({
				status: "FAILED",
				data: {
					error: "Bad Request",
				},
			});
		}

		const updatedUser = await userService.update(userId, body);
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
	
		
		const userRemoved = await userService.remove(userId)
		console.log(userRemoved);
		
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default {
	getAllUsers,
	createUser,
	updateUser,
	getUser,
	deleteUser
};

import userService from "../services/userServices.js";

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await userService.getAllUsers();
		res.status(201).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
	try {
		const { name, age, email, password, role } = req.body;
		const newUser = await userService.createUser({
			name,
			age,
			email,
			password,
			role,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


export default {
    getAllUsers,
    createUser
}
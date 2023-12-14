import userServices from "../services/userServices.js";

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userServices.getAll();
        res.status(200).json({
            status: "success",
            results: allUsers.length,
            data: {
                allUsers,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await userServices.getById(userId);

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
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {params, ...body} = req;

        const updatedUser = await userServices.update(params.userId, body);

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
        res.status(500).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {
            params: {userId},
        } = req;

        const userRemoved = await userServices.remove(userId);

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
        res.status(500).json({error: error.message});
    }
};

export default {
    getAllUsers,
    updateUser,
    getUser,
    deleteUser,
};

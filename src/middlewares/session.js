import {verifyToken} from "../utils/handleJwt.js";
import User from "../models/users.js";
import crudOperations from "../services/crudOperations.js";

const UserModel = crudOperations(User);

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: "fail",
                message: "NOT TOKEN",
            });
        }

        const token = req.headers.authorization.split(" ").pop();

        const dataToken = await verifyToken(token);

        if (!dataToken) {
            return res.status(401).json({
                status: "fail",
                message: "INVALID TOKEN",
            });
        }

        const user = await UserModel.getById(dataToken._id);

        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export {authMiddleware};

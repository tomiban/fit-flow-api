import {verifyToken} from "../utils/handleJwt.js";
import User from "../models/users.js";
import crudOperations from "../services/crudOperations.js";

const UserModel = crudOperations(User);

const authMiddleware = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "UNAUTHORIZED",
            });
        }

        const dataToken = await verifyToken(token);

        if (!dataToken) {
            return res.status(401).json({
                status: "fail",
                message: "INVALID TOKEN",
            });
        }

        const user = await UserModel.getById(dataToken._id);

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "INVALID TOKEN",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export {authMiddleware};

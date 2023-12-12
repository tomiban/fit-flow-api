import createService from "../services/crudOperations.js";
import User from "../models/users.js";
import {matchedData} from "express-validator";
import {encrypt} from "../utils/handlePassword.js";
import {tokenSign} from "../utils/handleJwt.js";

import pkg from "bcryptjs";
const {compare} = pkg;

const userService = createService(User);

const registerUser = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const registerUser = await userService.create(body);
        registerUser.set("password", undefined);

        const token = await tokenSign(registerUser);

        res.cookie("token", token); // lo mandamos como cookie

        res.status(201).json({
            status: "success",
            data: {
                user: registerUser,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = matchedData(req);

        const user = await userService.getByUsername({username: username});

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "USER NOT FOUND",
            });
        }
        const hashPassword = user.password;

        const check = await compare(password, hashPassword);

        if (!check) {
            return res.status(401).json({
                status: "fail",
                message: "INVALID PASSWORD",
            });
        }

        user.set("password", undefined);

        const loggedUser = {
            token: await tokenSign(user),
            user,
        };

        res.status(200).json(loggedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    registerUser,
    loginUser,
};

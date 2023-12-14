import {encrypt} from "../utils/handlePassword.js";
import {tokenSign} from "../utils/handleJwt.js";
import pkg from "bcryptjs";
import {matchedData} from "express-validator";
import userServices from "../services/userServices.js";

const {compare} = pkg;

const registerUser = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const password = await encrypt(validatedData.password);
        const newUser = {...validatedData, password};
        const registerUser = await userServices.create(newUser);
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
        const validatedData = matchedData(req);

        const {username, password} = validatedData;

        const user = await userServices.getByUsername({username: username});

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "USER NOT FOUND",
            });
        }
        const hashPassword = user.password;

        const isMatch = await compare(password, hashPassword);

        if (!isMatch) {
            return res.status(401).json({
                status: "fail",
                message: "INVALID PASSWORD",
            });
        }

        user.set("password", undefined);

        const token = await tokenSign(user);

        res.cookie("token", token); // lo mandamos como cookie

        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        console.log("entre");

        res.cookie("token", "", {
            expires: new Date(0),
        });
        res.status(200).json({status: "success"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export default {
    registerUser,
    loginUser,
    logoutUser,
};

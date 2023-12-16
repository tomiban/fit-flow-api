import {encrypt} from "../utils/handlePassword.js";
import {tokenSign} from "../utils/handleJwt.js";
import pkg from "bcryptjs";
import {matchedData} from "express-validator";
import userServices from "../services/userServices.js";
import {catchAsync} from "../utils/catchedAsync.js";
import {response} from "../utils/response.js";
import {ApiError} from "../utils/errors.js";
import httpStatus from "http-status";

const {compare} = pkg;

const registerUser = catchAsync(async (req, res) => {
    const validatedData = matchedData(req);
    const password = await encrypt(validatedData.password);
    const newUser = {...validatedData, password};
    const registeredUser = await userServices.create(newUser);
    registeredUser.set("password", undefined);
    const token = await tokenSign(registeredUser);

    if (!registeredUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "");
    }

    res.cookie("token", token);

    response(res, httpStatus.CREATED, {user: registeredUser});
});

const loginUser = catchAsync(async (req, res) => {
    const validatedData = matchedData(req);
    const {username, password} = validatedData;
    const user = await userServices.getByUsername({username: username});

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const hashPassword = user.password;
    const isMatch = await compare(password, hashPassword);

    if (!isMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
    }

    user.set("password", undefined);

    const token = await tokenSign(user);

    res.cookie("token", token); // lo mandamos como cookie
    response(res, httpStatus.OK, {user});
});

const logoutUser = catchAsync(async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    response(res, httpStatus.NO_CONTENT);
});

export default {
    registerUser,
    loginUser,
    logoutUser,
};

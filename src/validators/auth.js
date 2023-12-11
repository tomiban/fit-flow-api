import {check} from "express-validator";
import {validateResults} from "../utils/handleValidator.js";

export const validatorRegisterUser = [
    check("username")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25})
        .withMessage("Username must be between 5 and 25 characters"),

    check("firstName")
        .exists()
        .notEmpty()
        .isLength({min: 2, max: 40})
        .withMessage("First name must be between 2 and 40 characters"),

    check("lastName")
        .exists()
        .notEmpty()
        .isLength({min: 2, max: 40})
        .withMessage("Last name must be between 2 and 40 characters"),

    check("age").exists().notEmpty().isInt({min: 5, max: 150}).withMessage("Age must be a number between 5 and 150"),

    check("email").exists().notEmpty().isEmail().withMessage("You must provide a valid email"),

    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 6, max: 50})
        .withMessage("Password must be at least 6 characters"),

    check("birthDate").optional().toDate(),

    (req, res, next) => validateResults(req, res, next),
];

export const validatorLoginUser = [
    check("username")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25})
        .withMessage("Username must be between 5 and 25 characters"),

    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 6, max: 80})
        .withMessage("Password must be at least 6 characters"),
    (req, res, next) => validateResults(req, res, next),
];

export default {
    validatorRegisterUser,
};

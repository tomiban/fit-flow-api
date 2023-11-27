import {check} from "express-validator";
import {validateResults} from "../utils/handleValidator.js";
import User from "../models/users.js";

const isFieldAlreadyInUse = async (fieldName, value, userId, model) => {
    const existingRecord = await model.findOne({[fieldName]: value});
    return existingRecord && existingRecord._id.toString() !== userId;
};

const validatorCreateUser = [
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

const validatorUpdateUser = [
    check("username")
        .optional()
        .isLength({min: 5, max: 25})
        .withMessage("Username must be between 5 and 25 characters")
        .custom(async (value, {req}) => {
            const isUsernameInUse = await isFieldAlreadyInUse("username", value, req.params.userId, User);
            if (isUsernameInUse) {
                throw new Error("Username already in use");
            }
        }),

    check("firstName")
        .optional()
        .isLength({min: 2, max: 40})
        .withMessage("First name must be between 2 and 40 characters"),

    check("lastName")
        .optional()
        .isLength({min: 2, max: 40})
        .withMessage("Last name must be between 2 and 40 characters"),

    check("age").optional().isInt({min: 5, max: 150}).withMessage("Age must be a number between 5 and 150"),

    check("password")
        .optional()
        .notEmpty()
        .isLength({min: 6, max: 50})
        .withMessage("Password must be at least 6 characters"),

    check("email")
        .optional()
        .isEmail()
        .withMessage("You must provide a valid email")
        .custom(async (value, {req}) => {
            const isEmailInUse = await isFieldAlreadyInUse("email", value, req.params.userId, User);
            if (isEmailInUse) {
                throw new Error("Email already in use");
            }
        }),

    check("birthDate").optional().toDate(),
    (req, res, next) => validateResults(req, res, next),
];

const validatorIdUser = [
    check("userId").exists().isMongoId().withMessage("Invalid ID"),
    (req, res, next) => validateResults(req, res, next),
];

export {validatorCreateUser, validatorUpdateUser, validatorIdUser};

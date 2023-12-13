import {body, validationResult} from "express-validator";

/* export const validatorRegisterUser = [
    body("username").exists().trim().escape(),

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
]; */

const sanitizeLogin = [
    body("username").trim().escape(),
    body("password").trim().escape(),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            res.status(403);
            res.send({errors: error.array()});
        }
    },
];

const sanitizeRegister = [
    body("username").trim().escape(),
    body("password").trim().escape(),
    body("firstName").trim().escape(),
    body("lastName").trim().escape(),
    body("age").isInt(),
    body("email").trim().escape(),
    body("date").trim().escape(),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            res.status(403);
            res.send({errors: error.array()});
        }
    },
];

export {sanitizeLogin, sanitizeRegister};

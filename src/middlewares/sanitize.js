import {body, validationResult} from "express-validator";

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

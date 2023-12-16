import {body, validationResult} from "express-validator";

const sanitizeLogin = [
    body("username"),
    body("password"),
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
    body("username"),
    body("password"),
    body("firstName"),
    body("lastName"),
    body("age"),
    body("email"),
    body("date"),
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

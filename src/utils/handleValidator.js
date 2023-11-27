import { validationResult } from "express-validator";

export const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    next(); // continua la peticion al controlador
  } catch (error) {
    res.status(403);
    return res.send({ errors: error.array() });
  }
};

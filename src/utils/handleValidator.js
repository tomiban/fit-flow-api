import { validationResult } from "express-validator";

export const validateResults = (req, res, next) => {
	try {
		validationResult(req).throw();
		return next(); // continua la peticion al controlador
	} catch (error) {
		res.status(403);
		res.send({ errors: error.array() });
	}
};


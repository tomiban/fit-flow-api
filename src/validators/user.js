import { check } from "express-validator";

const validatorCreate = [
	check("username").exists().notEmpty().isLength({ min: 5, max: 25 }),
	check("firstName").exists().notEmpty().isLength({ min: 2, max: 40 }),
	check("lastName").exists().notEmpty().isLength({ min: 2, max: 40 }),
	check("age").exists().notEmpty().isInt({ min: 5, max: 150 }),
	check("email")
		.exists()
		.notEmpty()
		.isEmail()
		.withMessage("You must provide a valid email"),
	check("password")
		.exists()
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("The password must be at least 6 characters"),
	check("birthDate")
		.exists()
		.notEmpty()
		.isISO8601()
		.withMessage("Date of birth must be in a valid ISO 8601 format"),
];

export default {
	validatorCreate,
};

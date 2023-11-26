import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";
import users from "../models/users.js";

const validatorCreateUser = [
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
	(req, res, next) => validateResults(req, res, next),
];

const validatorUpdateUser = [
	check("username")
		.optional()
		.isLength({ min: 5, max: 25 })
		.withMessage("El nombre de usuario debe tener entre 5 y 25 caracteres")
		.custom(async (value, { req }) => {
			// Verificar si el nombre de usuario ya existe en la base de datos
			const existingUser = await users.findOne({ username: value });
			if (existingUser && existingUser._id.toString() !== req.params.userId) {
				throw new Error(
					"This username is already exist."
				);
			}
			return true;
		}),

	check("firstName")
		.optional()
		.isLength({ min: 2, max: 40 })
		.withMessage("El nombre debe tener entre 2 y 40 caracteres"),

	check("lastName")
		.optional()
		.isLength({ min: 2, max: 40 })
		.withMessage("El apellido debe tener entre 2 y 40 caracteres"),

	check("age")
		.optional()
		.isInt({ min: 5, max: 150 })
		.withMessage("La edad debe ser un número entre 5 y 150"),

	check("email")
		.optional()
		.isEmail()
		.withMessage("Debes proporcionar un correo electrónico válido")
		.custom(async (value, { req }) => {
			// Verificar si el correo electrónico ya existe en la base de datos
			const existingEmail = await users.findOne({ email: value });
			if (existingEmail && existingEmail._id.toString() !== req.params.userId) {
				throw new Error(
					"This email is already associated with another user."
				);
			}
			return true;
		}),

	check("birthDate")
		.optional()
		.isISO8601()
		.withMessage(
			"La fecha de nacimiento debe estar en un formato ISO 8601 válido")
		.custom(async (value, { req }) => {
			
		})
	,
		
	(req, res, next) => validateResults(req, res, next),
];

export { validatorCreateUser, validatorUpdateUser };

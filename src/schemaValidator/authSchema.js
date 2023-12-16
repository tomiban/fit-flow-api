import {z} from "zod";

const registerSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
        })
        .min(6, {message: "Username must be at least 6 characters"}),
    firstName: z
        .string({
            required_error: "First name is required",
        })
        .regex(/^[A-Za-z]+$/, {message: "Invalid first name"}),
    lastName: z.string({required_error: "Last name is required"}).regex(/^[A-Za-z]+$/, {message: "Invalid last name"}),
    age: z
        .number({
            required_error: "Age is required",
        })
        .gte(5, {message: "Age must be grater than 5"})
        .lte(99, {message: "Age must be lower than 99"}),

    email: z
        .string({
            required_error: "Email is required",
        })
        .email({message: "Invalid email"}),

    password: z
        .string({
            required_error: "Password is required",
        })
        .min(8, {message: "Password must be at least 8 characters"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one digit"}),

    birthDate: z.date().optional(),
});

const loginSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
        })
        .min(6, {message: "Username must be at least 6 characters"}),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(8, {message: "Password must be at least 8 characters"}),
});

export {registerSchema, loginSchema};

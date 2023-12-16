import {z} from "zod";

const createExeSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    actualWeight: z.number().gte(0, {message: "Weight must be grater or equal than 0"}).optional(),
    maxWeight: z.number().lte(1500).default(0).optional(),
    typeOfWeight: z.string().default(0).optional(),
    instruction: z.string().max(250, {message: "Instruction must be lower than 250 characters"}).optional(),
    link: z.string().optional(),
    category: z.enum(["Push", "Pull", "Core", "Leg"], {required_error: "Category is required"}),
});

const updateExeSchema = z.object({
    name: z.string().optional(),
    actualWeight: z.number().gte(0, {message: "Weight must be greater or equal to 0"}).optional(),
    maxWeight: z.number().lte(1500).optional(),
    typeOfWeight: z.string().optional(),
    instruction: z.string().max(250, {message: "Instruction must be less than 250 characters"}).optional(),
    link: z.string().optional(),
    category: z.enum(["Push", "Pull", "Core", "Leg"]).optional(),
});

export {createExeSchema, updateExeSchema};

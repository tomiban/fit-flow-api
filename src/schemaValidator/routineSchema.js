import {z} from "zod";
import exercises from "../models/exercises.js";

const createRouSchema = z.object({
    name: z.string({required_error: "Routine name is required"}).trim().min(1).max(100),
    exercises: z.array(exercises).default([]),
    estado_reproduccion: z.enum(["en_espera", "en_progreso", "completada"]).default("en_espera"),
});

const updateRouSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    exercises: z.array(exercises).optional(),
    estado_reproduccion: z.enum(["en_espera", "en_progreso", "completada"]).optional(),
});

export {createRouSchema, updateRouSchema};

import mongoose from "mongoose";
import {exercisesScheme} from "./exercises.js";

const routineSchema = new mongoose.Schema({
    name: {type: String, required: true},
    exercises: [exercisesScheme],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    estado_reproduccion: {
        type: String,
        enum: ["en_espera", "en_progreso", "completada"],
        default: "en_espera",
    },
});

export default mongoose.model("Routine", routineSchema);

import mongoose from "mongoose";
import exerciseSchema from "./exercises";

const rutinaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    exercises: [exerciseSchema], // Embebemos el esquema de ejercicio directamente
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    estado_reproduccion: {
        type: String,
        enum: ["en_espera", "en_progreso", "completada"],
        default: "en_espera",
    },
});

export default mongoose.model("Routine", rutinaSchema);

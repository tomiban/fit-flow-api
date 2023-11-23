import mongoose from "mongoose";

const rutinaSchema = new mongoose.Schema({
	nombre: String,
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
	fecha_creacion: {
		type: Date,
		default: Date.now,
	},
	fecha_realizacion: Date,
	tiempo_descanso_entre_ejercicios: Number,
	tiempo_descanso_entre_series: Number,
	ejercicios: [
		{
			ejercicio: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Ejercicio",
				required: true,
			},
			series: Number,
			repeticiones: Number,
			peso: Number,
			orden: Number,
		},
	],
	estado_reproduccion: {
		type: String,
		enum: ["en_espera", "en_progreso", "completada"],
		default: "en_espera",
	},
});


export default mongoose.model("Routines", rutinaSchema)
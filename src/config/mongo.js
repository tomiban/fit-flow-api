import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		const { DB_URL } = process.env;
		
		await mongoose.connect(DB_URL);

		console.log("Conectado a la base de datos");
	} catch (error) {
		console.error("Error de conexión a la base de datos:", error);
	}
};

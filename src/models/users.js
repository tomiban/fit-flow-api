import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		age: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		birthDate: { type: Date },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Users", userSchema);

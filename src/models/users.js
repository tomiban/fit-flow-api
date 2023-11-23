import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: String,
		age: Number,
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
        },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);


export default mongoose.model("Users", userSchema)
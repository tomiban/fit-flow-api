import mongoose from "mongoose";

const userSchema = new mongoose.Scheme(
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
        role: {
            type: ["user", "admin"],
            default: "user",
        }
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Users", userSchema)
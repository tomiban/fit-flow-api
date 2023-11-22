import mongoose from "mongoose";

const exercisesScheme = new mongoose.Scheme(
	{
		name: String,
		category: Number,
	},
);

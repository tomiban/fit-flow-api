import mongoose from "mongoose";

export const exercisesScheme = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        name: {type: String, required: [true, "Name is required"], trim: true},
        actualWeigth: {type: Number, default: 0},
        maxWeigth: {type: Number, default: 0},
        typeOfWeigth: {type: String},
        instruction: {type: String, trim: true},
        link: {type: String, trim: true},
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Push", "Pull", "Core", "Leg"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Exercise", exercisesScheme);

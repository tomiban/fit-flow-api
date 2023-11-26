import mongoose from "mongoose";

const exercisesScheme = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    name: { type: String, required: [true, "Name is required"] },
    actualWeigth: { type: Number },
    maxWeigth: { type: Number },
    instruction: { type: String },
    link: { type: String },
    category: { type: String, required: [true, "Category is required"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Exercises", exercisesScheme);

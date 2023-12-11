import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema(
    {
        name: {type: String, enum: ["Push", "Pull", "Leg", "Core"], unique: true, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Category", categorySchema);

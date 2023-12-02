import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
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
            select: false,
        },
        birthDate: {type: Date},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
userSchema.plugin(MongooseDelete, {overrideMethods: "all"});
export default mongoose.model("Users", userSchema);

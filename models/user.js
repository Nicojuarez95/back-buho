import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    businessName: {
        type: String,
        required: true
    },

    ownerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
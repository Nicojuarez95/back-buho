import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "ERROR"],
        default: "PENDING"
    },

    invoiceNumber: {
        type: Number
    },

    cae: {
        type: String
    },

    error: {
        type: String
    }

}, {
    timestamps: true
});

export default mongoose.model("Invoice", invoiceSchema);
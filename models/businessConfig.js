import mongoose from "mongoose";

const businessConfigSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },

    pointOfSale: {
        type: Number,
        default: 1
    },

    voucherType: {
        type: Number,
        default: 11
    },

    concept: {
        type: Number,
        default: 1
    },

    currency: {
        type: String,
        default: "PES"
    },

    documentType: {
        type: Number,
        default: 99
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "BusinessConfig",
    businessConfigSchema
);

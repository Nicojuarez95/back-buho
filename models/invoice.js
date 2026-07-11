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
        enum: [
            "PENDING",
            "PROCESSING",
            "SUCCESS",
            "ERROR"
        ],
        default: "PENDING"
    },

    invoiceNumber: {
        type: Number
    },

    pointOfSale: {
        type: Number
    },

    voucherType: {
        type: Number,
        default: 11 // Factura C
    },

    cae: {
        type: String
    },

    caeExpiration: {
        type: String
    },

    sentAt: {
        type: Date
    },

    afipResponse: {
        type: mongoose.Schema.Types.Mixed
    },

    error: {
        type: String
    }

}, {
    timestamps: true
});

export default mongoose.model("Invoice", invoiceSchema);
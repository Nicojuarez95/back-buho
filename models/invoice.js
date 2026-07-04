import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({

    amount:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["PENDING","SUCCESS","ERROR"],
        default:"PENDING"
    },

    invoiceNumber:{
        type:Number
    },

    cae:{
        type:String
    },

    error:{
        type:String
    }

},{
    timestamps:true
})

export default mongoose.model("Invoice",invoiceSchema);
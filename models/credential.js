import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({

    businessName:{
        type:String,
        required:true
    },

    apiKey:{
        type:String,
        required:true
    },

    apiSecret:{
        type:String,
        required:true
    },

    pointOfSale:{
        type:Number,
        default:1
    }

})

export default mongoose.model("Credential",credentialSchema);
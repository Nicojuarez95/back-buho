import Credential from "../models/credential.js";

export const createCredential = async (req, res) => {

    try {

        const credential = new Credential(req.body);

        await credential.save();

        res.status(201).json({
            ok:true,
            message:"Credenciales guardadas correctamente",
            credential
        });

    } catch (error) {

        res.status(500).json({
            ok:false,
            message:error.message
        });

    }

}


export const getCredentials = async (req,res)=>{

    try{

        const credentials = await Credential.find();

        res.json({
            ok:true,
            credentials
        });

    }catch(error){

        res.status(500).json({
            ok:false,
            message:error.message
        })

    }

}
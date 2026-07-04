import Credential from "../models/credential.js";

export const createCredential = async (req, res) => {

    try {

        const credential = await Credential.findOneAndUpdate(

            {
                user: req.user._id
            },

            {
                ...req.body,
                user: req.user._id
            },

            {
                new: true,
                upsert: true
            }

        );

        res.status(201).json({
            ok: true,
            credential
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}

export const getCredentials = async (req, res) => {

    try {

        const credential = await Credential.findOne({
            user: req.user._id
        });

        res.json({
            ok: true,
            credential
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}
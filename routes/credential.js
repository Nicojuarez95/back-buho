import express from "express";

import {
    createCredential,
    getCredentials
} from "../controllers/credential.controller.js";

const router = express.Router();

router.post("/",createCredential);

router.get("/",getCredentials);

export default router;
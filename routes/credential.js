import express from "express";

import {
    createCredential,
    getCredentials
} from "../controllers/credential.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCredential);
router.get("/", authMiddleware, getCredentials);

export default router;
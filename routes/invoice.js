import express from "express";

import {
    simulateInvoices,
    createInvoices
} from "../controllers/invoice.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/simulate", authMiddleware, simulateInvoices);
router.post("/create", authMiddleware, createInvoices);

export default router;
import express from "express";

import {
    simulateInvoices,
    createInvoices,
    getInvoices,
    processInvoices
} from "../controllers/invoice.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/simulate", authMiddleware, simulateInvoices);
router.post("/create", authMiddleware, createInvoices);
router.get("/", authMiddleware, getInvoices);
router.post("/process", authMiddleware, processInvoices);

export default router;
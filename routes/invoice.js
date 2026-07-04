import express from "express";

import {
    simulateInvoices, createInvoices
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/simulate", simulateInvoices);
router.post("/create", createInvoices);

export default router;
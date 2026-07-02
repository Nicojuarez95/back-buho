import express from "express";

import {
    simulateInvoices
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/simulate", simulateInvoices);

export default router;
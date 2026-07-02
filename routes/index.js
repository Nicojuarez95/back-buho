import express from "express";
import invoiceRouter from "./invoice.js";
import credentialRouter from "./credential.js";
import categoryRouter from "./category.js";

const router = express.Router();

router.use("/credentials", credentialRouter);
router.use("/categories", categoryRouter);
router.use("/invoice", invoiceRouter);

export default router;
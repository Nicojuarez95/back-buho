import express from "express";
import invoiceRouter from "./invoice.js";
import credentialRouter from "./credential.js";
import categoryRouter from "./category.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/credentials", credentialRouter);
router.use("/categories", categoryRouter);
router.use("/invoice", invoiceRouter);
router.use("/auth", authRouter);

export default router;
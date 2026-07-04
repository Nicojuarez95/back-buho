import { getCategoryByAmount } from "../services/category.service.js";
import invoiceService from "../services/invoice.service.js";

export const simulateInvoices = async (req, res) => {

    try {

        const sales = req.body;

        const result = [];

        for (const sale of sales) {

            const category = await getCategoryByAmount(sale.amount);

            result.push({
                amount: sale.amount,
                category: category ? category.name : "Sin categoría"
            });

        }

        res.json({
            ok: true,
            invoices: result
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

};
export const createInvoices = async (req, res) => {

    try {

        const sales = req.body;

        const invoices = [];

        for (const sale of sales) {

            const invoice = await invoiceService.createPendingInvoice(
                sale.amount
            );

            invoices.push(invoice);

        }

        res.status(201).json({
            ok: true,
            invoices
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}
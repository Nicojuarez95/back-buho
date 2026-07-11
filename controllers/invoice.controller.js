import invoiceService from "../services/invoice.service.js";

export const createInvoices = async (req, res) => {

    try {

        const sales = req.body;

        const invoices = [];

        for (const sale of sales) {

            const invoice = await invoiceService.createPendingInvoice(

                sale.amount,

                req.user._id

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

export const simulateInvoices = async (req, res) => {

    try {

        const sales = req.body;

        const invoices = [];

        for (const sale of sales) {

            const category = await invoiceService.simulateCategory(

                sale.amount,

                req.user._id

            );

            invoices.push({

                amount: sale.amount,

                category: category?.name || "Sin categoría"

            });

        }

        res.json({

            ok: true,

            invoices

        });

    } catch (error) {

        res.status(500).json({

            ok: false,

            message: error.message

        });

    }

}; 
export const getInvoices = async (req, res) => {

    try {

        const invoices = await invoiceService.getInvoices(
            req.user._id
        );

        res.json({
            ok: true,
            invoices
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    };

    

};
export const processInvoices = async (req, res) => {

    try {

        const invoices = await invoiceService.processPendingInvoices(
            req.user._id
        );

        res.json({
            ok: true,
            processed: invoices.length,
            invoices
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

};
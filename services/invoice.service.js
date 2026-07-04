import Invoice from "../models/invoice.js";

import { getCategoryByAmount } from "./category.service.js";

class InvoiceService {

    async createPendingInvoice(

        amount,

        userId

    ) {

        const category = await getCategoryByAmount(

            amount,

            userId

        );

        if (!category) {

            throw new Error("No existe una categoría para ese monto.");

        }

        const invoice = await Invoice.create({

            user: userId,

            amount,

            category: category.name,

            status: "PENDING"

        });

        return invoice;

    }

    async simulateCategory(

        amount,

        userId

    ) {

        return await getCategoryByAmount(

            amount,

            userId

        );

    }

}

export default new InvoiceService();
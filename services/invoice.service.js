import Invoice from "../models/invoice.js";
import { getCategoryByAmount } from "./category.service.js";

class InvoiceService {

    async createPendingInvoice(amount) {

        const category = await getCategoryByAmount(amount);

        if (!category) {
            throw new Error("No existe una categoría para ese monto.");
        }

        const invoice = await Invoice.create({
            amount,
            category: category.name,
            status: "PENDING"
        });

        return invoice;
    }

}


export default new InvoiceService();
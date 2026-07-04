import Invoice from "../models/invoice.js";
import { getCategoryByAmount } from "./category.service.js";

class InvoiceService {

    async createPendingInvoice(amount, userId) {

        const category = await getCategoryByAmount(amount, userId);

        if (!category) {
            throw new Error("No existe una categoría para ese monto.");
        }

        const invoice = await Invoice.create({
            user: userId,
            amount,
            category: category._id,
            status: "PENDING"
        });

        return invoice;
    }

    async simulateCategory(amount, userId) {

        return await getCategoryByAmount(amount, userId);

    }

    async getInvoices(userId) {

        return await Invoice.find({
            user: userId
        })
        .populate("category")
        .sort({
            createdAt: -1
        });

    }

}

export default new InvoiceService();
import Category from "../models/category.js";

export const getCategoryByAmount = async (amount) => {

    return await Category.findOne({
        minAmount: {
            $lte: amount
        },
        maxAmount: {
            $gte: amount
        }
    });

}
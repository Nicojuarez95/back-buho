import Category from "../models/category.js";

export const getCategoryByAmount = async (amount, userId) => {

    return await Category.findOne({
        user: userId,
        minAmount: {
            $lte: amount
        },
        maxAmount: {
            $gte: amount
        }
    });

};
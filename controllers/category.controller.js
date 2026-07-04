import Category from "../models/category.js";

export const createCategory = async (req, res) => {

    try {

        const category = new Category({
            ...req.body,
            user: req.user._id
        });

        await category.save();

        res.status(201).json({
            ok: true,
            category
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}

export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find({
            user: req.user._id
        }).sort({
            minAmount: 1
        });

        res.json({
            ok: true,
            categories
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}
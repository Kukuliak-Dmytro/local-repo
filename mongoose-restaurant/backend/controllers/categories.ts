import { Request, Response } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../services/categories";
import { defineError } from "../utils/error";
import Dish from "../models/dishes";

const categoriesController = {
    getAllCategories: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const categories = await getAllCategories(page, limit);
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ message: defineError(error.message) });
        }
    },
    getCategoryById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await getCategoryById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error: any) {
            res.status(500).json({ message: defineError(error.message) });
        }
    },

    createCategory: async (req: Request, res: Response) => {
        try {
            if (!req.body.name || !req.body.description) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const { name, description } = req.body;
            const category = await createCategory({ name, description });
            res.status(201).json(category);
        } catch (error: any) {
            res.status(500).json({ message: defineError(error.message) });
        }
    },
    updateCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const category = await updateCategory(id, { name, description });
            res.status(200).json(category);
        } catch (error: any) {
            res.status(500).json({ message: defineError(error.message) });
        }
    },
    deleteCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Category ID is required" });
            }
            const dishesUsingCategory = await Dish.find({ categories: id });

            if (dishesUsingCategory.length > 0) {
                const dishNames = dishesUsingCategory.map(dish => dish.name).join(', ');
                return res.status(400).json({ message: `Cannot delete category.` });
            }
            const category = await deleteCategory(id);
            res.status(200).json(category);
        } catch (error: any) {
            res.status(500).json({ message: defineError(error.message) });
        }
    }
}
export default categoriesController;
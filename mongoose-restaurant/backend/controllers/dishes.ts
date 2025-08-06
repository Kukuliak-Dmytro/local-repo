import { Request, Response } from "express";
import { createDish, getDishes, getDishById, updateDish, deleteDish } from "../services/dishes";
import Category from "../models/categories";
import Ingredient from "../models/ingredients";
import { defineError } from "../utils/error";

const dishesController = {
    // Debug endpoint to list all categories
    listCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find({}, 'name description').sort({ name: 1 });
            res.status(200).json({ 
                categories: categories.map(cat => ({
                    name: cat.name,
                    description: cat.description
                }))
            });
        } catch (error) {
            res.status(500).json({message:defineError(error)});
        }
    },

    createDish: async (req:Request, res:Response)=>{
        try{
            if(!req.body.name || !req.body.categories || !req.body.ingredients || !req.body.description || !req.body.country || !req.body.price){
                return res.status(400).json({message:"All fields are required"});
            }

            const {name, categories, ingredients, description, country, price} = req.body;
            // Check if all categories exist
            const categoriesExists = await Category.find({_id: {$in: categories}});
            if(categoriesExists.length !== categories.length){
                return res.status(400).json({message:"One or more categories not found"});
            }
            
            // Check if all ingredients exist
            const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
            if(ingredientsExists.length !== ingredients.length){
                return res.status(400).json({message:"One or more ingredients not found"});
            }

            const dish = await createDish({name, categories, ingredients, description, country, price});
            res.status(201).json(dish);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },

    getDishes: async (req: Request, res: Response) => {
        try {
            const categories=req.query.categories as string;
            console.log(categories);
            const categoriesArray = categories ? categories.split(",") : [];
           
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const {min, max} = req.query;
            
            // Handle undefined or invalid parameters
            const minAmount = min ? parseInt(min as string) : 0;
            const maxAmount = max ? parseInt(max as string) : 100000;
            
            // Validate that the parsed values are valid numbers
            if (isNaN(minAmount) || isNaN(maxAmount)) {
                return res.status(400).json({message: "Invalid min or max amount"});
            }
            
            const dishes = await getDishes(page, limit, categoriesArray, minAmount, maxAmount);
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({message:defineError(error)});
        }
    },
    getDishById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            
            const dish = await getDishById(id);
            if (!dish) {
                return res.status(404).json({ message: "Dish not found" });
            }
            
            res.status(200).json(dish);
        } catch (error) {
            res.status(500).json({message:defineError(error)});
        }
    },
    updateDish: async (req: Request, res: Response) => {
        try{
            if(!req.params.id){
                return res.status(400).json({message:"Dish ID is required"});
            }
            if(!req.body.name || !req.body.categories || !req.body.ingredients || !req.body.description || !req.body.country || !req.body.price){
                return res.status(400).json({message:"All fields are required"});
            }
            
            const { id } = req.params;
            const {name, categories, ingredients, description, country, price} = req.body;

            const categoriesExists = await Category.find({_id: {$in: categories}});
            if(categoriesExists.length !== categories.length){
                return res.status(400).json({message:"One or more categories not found"});
            }
            
            // Check if all ingredients exist
            const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
            if(ingredientsExists.length !== ingredients.length){
                return res.status(400).json({message:"One or more ingredients not found"});
            }
            const dish = await updateDish(id, {name, categories, ingredients, description, country, price});
            if(!dish){
                return res.status(404).json({message:"Dish not found"});
            }
            res.status(200).json(dish);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    deleteDish: async (req: Request, res: Response) => {
        try{
            if(!req.params.id){
                return res.status(400).json({message:"Dish ID is required"});
            }
            const { id } = req.params;
            const dish = await deleteDish(id);
            res.status(200).json(dish);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    }
}
export default dishesController;
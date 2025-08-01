import { Request, Response } from "express";
import { createDish, getDishes, getDishById, updateDish, deleteDish } from "../services/dishes";
import Category from "../models/categories";
import Ingredient from "../models/ingredients";

const dishesController = {
    createDish: async (req:Request, res:Response)=>{
        try{
            if(!req.body.name || !req.body.categories || !req.body.ingredients || !req.body.description || !req.body.country || !req.body.price){
                return res.status(400).json({message:"All fields are required"});
            }

            const {name, categories, ingredients, description, country, price} = req.body;
            // Check if all categories exist
        const categoriesExists = await Category.find({_id: {$in: categories}});
        if(categoriesExists.length !== categories.length){
            res.status(400).json({message:"One or more categories not found"});
        }
        
        // Check if all ingredients exist
        const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
        if(ingredientsExists.length !== ingredients.length){
            res.status(400).json({message:"One or more ingredients not found"});
        }

        const dish = await createDish({name, categories, ingredients, description, country, price});
        res.status(201).json(dish);
    }catch(error){
        res.status(500).json({message:"Error creating dish"});
    }
    },

    getDishes: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const dishes = await getDishes(page, limit);
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({ message: "Error fetching dishes" });
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
            res.status(500).json({ message: "Error fetching dish" });
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
                res.status(400).json({message:"One or more categories not found"});
            }
            
            // Check if all ingredients exist
            const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
            if(ingredientsExists.length !== ingredients.length){
                res.status(400).json({message:"One or more ingredients not found"});
            }
            const dish = await updateDish(id, {name, categories, ingredients, description, country, price});
            if(!dish){
                return res.status(404).json({message:"Dish not found"});
            }
            res.status(200).json(dish);
        }catch(error){
            res.status(500).json({ message: "Error updating dish" });
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
            res.status(500).json({ message: "Error deleting dish" });
        }
    }
}
export default dishesController;
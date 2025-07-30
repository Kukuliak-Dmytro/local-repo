import { Request, Response } from "express";
import { CreateIngredient, DeleteIngredient, GetAllIngredients, GetIngredientById, UpdateIngredient } from "../services/ingredients";

const IngredientsController={
    getAllIngredients:async(req:Request, res:Response)=>{
        try{
            const {page, limit}=req.query;
            const ingredients=await GetAllIngredients(page as number|undefined, limit as number|undefined);
            res.status(200).json(ingredients);
        }catch(error){
            res.status(500).json({message:"Error getting ingredients"});
        }
    },
    getIngredientById:async(req:Request, res:Response)=>{
        try{
            if(!req.params.id){
                return res.status(400).json({message:"Id is required"});
            }
            const {id}=req.params;
            const ingredient=await GetIngredientById(id);
            if(!ingredient){
                return res.status(404).json({message:"Ingredient not found"});
            }
            res.status(200).json(ingredient);
        }catch(error){
            res.status(500).json({message:"Error getting ingredient"});
        }
    },
    createIngredient:async(req:Request, res:Response)=>{
        const {name, price}=req.body;
        try{
            if(!name || !price){
                return res.status(400).json({message:"Name and price are required"});
            }
            const newIngredient=await CreateIngredient(name, price);
            res.status(201).json(newIngredient);
        }catch(error){
            res.status(500).json({message:"Error creating ingredient"});
        }
    },
    updateIngredient:async(req:Request, res:Response)=>{
        try{
            const {id}=req.params;
            const {name, price}=req.body;
            const updatedIngredient=await UpdateIngredient(id, name, price);
            if(!updatedIngredient){
                return res.status(404).json({message:"Ingredient not found"});
            }
            res.status(200).json(updatedIngredient);
        }catch(error){
            res.status(500).json({message:"Error updating ingredient"});
        }
    },  
    deleteIngredient:async(req:Request, res:Response)=>{
        try{
            const {id}=req.params;
            const deletedIngredient=await DeleteIngredient(id);
            if(!deletedIngredient){
                return res.status(404).json({message:"Ingredient not found"});
            }
            res.status(200).json(deletedIngredient);
        }catch(error){
            res.status(500).json({message:"Error deleting ingredient"});
        }
    }
}
export default IngredientsController;
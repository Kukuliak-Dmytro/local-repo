import { Request, Response } from "express";
import { CreateIngredient, DeleteIngredient, GetAllIngredients, GetIngredientById, UpdateIngredient } from "../services/ingredients";
import { defineError } from "../utils/error";

const IngredientsController={
    getAllIngredients:async(req:Request, res:Response)=>{
        try{
            const {page, limit}=req.query;
            const ingredients=await GetAllIngredients(page as number|undefined, limit as number|undefined);
            res.status(200).json(ingredients);
        }catch(error:any){
            res.status(500).json({message:defineError(error.message)});
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
        }catch(error:any){
            res.status(500).json({message:defineError(error.message)});
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
        }catch(error:any){
            res.status(500).json({message:defineError(error.message)});
        }
    },
    updateIngredient:async(req:Request, res:Response)=>{
        try{
            const {id}=req.params;
            const {name, price, stock}=req.body;
            const updatedIngredient=await UpdateIngredient(id, name, price, stock);
            if(!updatedIngredient){
                return res.status(404).json({message:"Ingredient not found"});
            }
            res.status(200).json(updatedIngredient);
        }catch(error:any){
            res.status(500).json({message:defineError(error.message)});
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
        }catch(error:any){
            res.status(500).json({message:defineError(error.message)});
        }
    }
}
export default IngredientsController;
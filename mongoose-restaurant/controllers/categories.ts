import { Request, Response } from "express";
import { createCategory } from "../services/categories";

const categoriesController = {
    createCategory: async (req:Request, res:Response)=>{
        try{
            if(!req.body.name || !req.body.description){
                return res.status(400).json({message:"All fields are required"});
            }
            const {name, description} = req.body;
            const category = await createCategory({name, description});
            res.status(201).json(category);
        }catch(error){
            res.status(500).json({message:"Error creating category"});
        }
    }
}
export default categoriesController;
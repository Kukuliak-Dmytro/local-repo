import Category from "../models/categories";
import { Schema } from "mongoose";

export async function createCategory(category: typeof Category.schema.obj) {
    try{
        const newCategory = await Category.create(category);
        return newCategory;
    }catch(error){
        throw error;
    }
}


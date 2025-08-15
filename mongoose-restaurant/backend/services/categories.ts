import Category from "../models/categories";
import Dish from "../models/dishes";
import { Schema } from "mongoose";
import paginate from "../utils/pagination";
export async function getAllCategories(page: number, limit: number){
    try{
        const categories = await Category.find();
        const paginatedCategories = paginate(categories, page, limit);
        return paginatedCategories;
    }catch(error){
        throw error;
    }
}
export async function getCategoryById(id:string){
    try{
        const category = await Category.findById(id);
        return category;
    }
    catch(error){
        throw error
    }
}

export async function createCategory(category: typeof Category.schema.obj) {
    try{
        const newCategory = await Category.create(category);
        return newCategory;
    }catch(error){
        throw error;
    }
}

export async function updateCategory(id:string, category: typeof Category.schema.obj){
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, {...category, $inc: { __v: 1 }}, { new: true, runValidators: true });
        return updatedCategory;
    }
    catch(error){
        throw error
    }
}
export async function deleteCategory(id:string){
    try{
        // Check if category is referenced by any dishes
        
        
        const deletedCategory = await Category.findByIdAndDelete(id);
        return ({ message: "Category deleted successfully"});
    }
    catch(error){
        throw error
    }
}
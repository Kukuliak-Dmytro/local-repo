import Dish from "../models/dishes";
import Category from "../models/categories";
import Ingredient from "../models/ingredients";
import { DiscriminatorSchema, Types } from "mongoose";
import paginate from "../utils/pagination";

export async function getDishes(page: number, limit: number) {
    try{
        const dishes = await Dish.find()
            .populate('ingredients')
            .populate('categories');
        const paginatedDishes = paginate(dishes, page, limit);
        return paginatedDishes;
    }catch(error){
        throw error;
    }
}

export async function getDishesWithIngredients(page: number, limit: number) {
    try{
        const dishes = await Dish.find()
            .populate('ingredients')
            .populate('categories');
        const paginatedDishes = paginate(dishes, page, limit);
        return paginatedDishes;
    }catch(error){
        throw error;
    }
}

export async function getDishById(id: string) {
    try{
        const dish = await Dish.findById(id)
            .populate('ingredients')
            .populate('categories');
        return dish;
    }catch(error){
        throw error;
    }
}

export async function createDish(dish: typeof Dish.schema.obj) {
    try{
        const newDish = await Dish.create(dish);
        return newDish;
    }catch(error){
        throw error;
    }
}


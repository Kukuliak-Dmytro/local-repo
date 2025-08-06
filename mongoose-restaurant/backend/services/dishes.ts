import Dish from "../models/dishes";
import Category from "../models/categories";
import Ingredient from "../models/ingredients";
import { DiscriminatorSchema, Types } from "mongoose";
import paginate from "../utils/pagination";
import { getCategoryById } from "./categories";

export async function getDishes(page: number, limit: number, categories: string[], minAmount: number, maxAmount: number) {
    try {
        let query = {};
        
        console.log('Categories received:', categories);
        
        // Only filter by categories if categories array is provided and not empty
        if (categories && categories.length > 0) {
            // First, let's see what categories exist in the database
            const allCategories = await Category.find({}, 'name');
            console.log('All categories in database:', allCategories.map(cat => `"${cat.name}"`));
            
            const categoriesArray = await Promise.all(categories.map(async (category) => {
                // Trim whitespace and use case-insensitive search
                const trimmedCategory = category.trim();
                console.log(`Searching for category: "${trimmedCategory}"`);
                
                const foundCategory = await Category.findOne({ 
                    name: { $regex: new RegExp(`^${trimmedCategory}$`, 'i') } 
                });
                
                if (!foundCategory) {
                    console.log(`Category "${trimmedCategory}" not found. Available categories:`, 
                        allCategories.map(cat => `"${cat.name}"`));
                    throw new Error(`Category "${trimmedCategory}" not found`);
                }
                
                console.log(`Found category: "${foundCategory.name}" for search term: "${trimmedCategory}"`);
                return foundCategory._id;
            }));

            query = { categories: { $in: categoriesArray,price:{$gte:minAmount,$lte:maxAmount} } };
            console.log('Category IDs found:', categoriesArray);
        }

        console.log('Final query:', JSON.stringify(query));
        const filteredDishes = await Dish.find(query).populate('ingredients').populate('categories');
        console.log('Dishes found:', filteredDishes.length);
        
        const paginatedDishes = paginate(filteredDishes, page, limit);
        return paginatedDishes;
    } catch (error) {
        console.error('Error in getDishes:', error);
        throw error;
    }
}


export async function getDishById(id: string) {
    try {
        const dish = await Dish.findById(id)
            .populate('ingredients')
            .populate('categories');
        return dish;
    } catch (error) {
        throw error;
    }
}

export async function createDish(dish: typeof Dish.schema.obj) {
    try {
        const newDish = await Dish.create(dish);
        return newDish;
    } catch (error) {
        throw error;
    }
}

export async function updateDish(id: string, dish: typeof Dish.schema.obj) {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(id, { ...dish, $inc: { __v: 1 } }, { new: true, runValidators: true });
        return updatedDish;
    } catch (error) {
        throw error;
    }
}

export async function deleteDish(id: string) {
    try {
        await Dish.findByIdAndDelete(id);
        return ({ message: "Dish deleted successfully" });
    } catch (error) {
        throw error;
    }
}
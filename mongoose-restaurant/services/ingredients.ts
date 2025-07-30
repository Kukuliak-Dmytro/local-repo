import Ingredient from "../models/ingredients";
import paginate from "../utils/pagination";
export async function GetAllIngredients(page?:number, itemsPerPage?:number){
    try{
        const ingredients=await Ingredient.find();
        const paginatedIngredients=paginate(ingredients, page, itemsPerPage);
        return paginatedIngredients;
    }catch(error){
        throw error;
    }
}

export async function GetIngredientById(id:string){
    try{
        const ingredient=await Ingredient.findById(id);
        return ingredient;
        }catch(error){
        throw error;
    }
}

export async  function CreateIngredient(name:string, price:number){
    try{
        const newIngreditnt= await Ingredient.create({name, price})
        return newIngreditnt;
    }catch(error){
        throw error;
    }
}

export async function UpdateIngredient(id:string, name:string, price:number){
    try{
        const updatedIngredient = await Ingredient.findOneAndUpdate(
            { _id: id },
            { 
                $set: { name, price },
                $inc: { __v: 1 }  // Manually increment version
            },
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        return updatedIngredient;
        }catch(error){
        throw error;
    }
}
export async function DeleteIngredient(id:string){
    try{
        const deletedIngredient=await Ingredient.findByIdAndDelete(id);
        return deletedIngredient;
    }catch(error){
        throw error;
    }
}

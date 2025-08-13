import Ingredient from "../models/ingredients";
import Dish from "../models/dishes";
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

export async  function CreateIngredient(name:string, price:number, stock:number){
    try{
        const newIngreditnt= await Ingredient.create({name, price, stock})
        return newIngreditnt;
    }catch(error){
        throw error;
    }
}

export async function UpdateIngredient(id:string, name:string, price:number, stock?:number){
    try{
        const updateData: any = { name, price };
        if (stock !== undefined) {
            updateData.stock = stock;
        }
        console.log(updateData);
        const updatedIngredient = await Ingredient.findOneAndUpdate(
            { _id: id },
            { 
                $set: updateData,
                $inc: { __v: 1 }  // Manually increment version
            },
            { 
                new: true, 
                runValidators: true 
            }
        );
        console.log(updatedIngredient);
        return updatedIngredient;
        }catch(error){
        throw error;
    }
}
export async function DeleteIngredient(id:string){
    try{
        // Check if ingredient is referenced by any dishes
        const dishesUsingIngredient = await Dish.find({ ingredients: id });
        
        if (dishesUsingIngredient.length > 0) {
            const dishNames = dishesUsingIngredient.map(dish => dish.name).join(', ');
            throw new Error(`Cannot delete ingredient. It is used by the following dishes: ${dishNames}`);
        }
        
        const deletedIngredient=await Ingredient.findByIdAndDelete(id);
        return deletedIngredient;
    }catch(error){
        throw error
    }
}

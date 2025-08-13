import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import type Ingredient from "../types/ingredients";

const useIngredients = () => {
    return useQuery({
            queryKey: ["ingredients"],
        queryFn:async ():Promise<{current:number, data:Ingredient[], limit:number, totalPages:number}>  => {
            const response = await http.get<{current:number, data:Ingredient[], limit:number, totalPages:number}>("/ingredients");
            // console.log(response.data);
            return response.data;
        },
    });
};
const useEditIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ingredient:Ingredient):Promise<Ingredient> => {
            console.log(ingredient);
            const response = await http.put(`/ingredients/${ingredient._id}`, {...ingredient, updatedAt:new Date()});
            console.log(response.data);
            return response.data;
        },
        mutationKey: ["editIngredient"],
        onSuccess: () => {
            // Invalidate and refetch ingredients query to update the UI
            queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
    });
};

const useCreateIngredient=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ingredient:Ingredient):Promise<Ingredient> => {
            const response = await http.post("/ingredients", {name:ingredient.name, price:ingredient.price, stock:ingredient.stock});
            return response.data;
        },
        onSuccess: () => {
            console.log("ingredient created");
            queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
    });
}

export  {useIngredients, useEditIngredient, useCreateIngredient};
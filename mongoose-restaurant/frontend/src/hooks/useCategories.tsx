import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import type Category from "../types/categories";
import type Ingredient from "src/types/ingredients";

const useCategories = () => {
    return useQuery({
            queryKey: ["ingredients"],
        queryFn:async ():Promise<{current:number, data:Category[], limit:number, totalPages:number}>  => {
            const response = await http.get<{current:number, data:Category[], limit:number, totalPages:number}>("/categories");
            // console.log(response.data);
            return response.data;
        },
    });
};
const useEditCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (category:Category):Promise<Category> => {
            console.log(category);
            const response = await http.put(`/categories/${category._id}`, {...category, updatedAt:new Date()});
            console.log(response.data);
            return response.data;
        },
        mutationKey: ["editCategory"],
        onSuccess: () => {
            // Invalidate and refetch ingredients query to update the UI
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

const useCreateCategory=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (category:Category):Promise<Category> => {
            const response = await http.post("/categories", {name:category.name, description:category.description});
            return response.data;
        },
        onSuccess: () => {
            console.log("category created");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export  {useCategories, useEditCategory, useCreateCategory};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import type Category from "../types/categories";

const useCategories = (page:number, limit:number) => {
    return useQuery({
            queryKey: ["categories", page, limit],
        queryFn:async ():Promise<{currentPage:number, data:Category[], limit:number, totalPages:number}>  => {
            const response = await http.get<{currentPage:number, data:Category[], limit:number, totalPages:number}>("/categories", {params:{page, limit}});
            console.log(response.data);
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

const useDeleteCategory=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id:string):Promise<Category> => {
            const response = await http.delete(`/categories/${id}`);
            console.log(response);
            if(response.data.message==='Cannot delete category.'){
                throw new Error(response.data.message);
            }
            return response.data;
        },
        onSuccess: () => {
            console.log("category deleted");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
           alert(error.message);
        },
    });
}
export  {useCategories, useEditCategory, useCreateCategory, useDeleteCategory};
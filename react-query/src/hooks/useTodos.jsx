import http from "../utils/http"
import { queryClient } from "../main"
import { useMutation } from "@tanstack/react-query"
export default function useTodos(){
const {mutate:createTodoMutation} = useMutation({
    mutationKey:['createTodo'],
    mutationFn:async (formData)=>{
        try{
            const {title,description} = formData
            if(!title || !description){
                throw new Error("Title and description are required")
            }
            const response = await http.post("/todos",{title,description})
            console.log("Todo created successfully")
            console.log(response.data)
            return response.data
    
        }
        catch(e){
            console.error(e.message)
        }
    },
    onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['getTodos']})
        return data
    }
    }
)
const {mutate:deleteTodoMutation}=useMutation({
    mutationKey:['deleteTodo'],
    mutationFn:async(todoId)=>{
        try{
            const response = await http.delete(`/todos/${todoId}`)
            console.log("Todo deleted successfully")
            console.log(response.data)
            return response.data
        }
        catch(e){
            console.error(e.message)
        }
    },
    onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['getTodos']})
        return data
    }
    }
)
    return {createTodoMutation, deleteTodoMutation}
}
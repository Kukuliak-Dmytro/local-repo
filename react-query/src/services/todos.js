import http from "../utils/http";
export const getTodos = async () =>{
    try{
        const response = await http.get("/todos");
        console.log("Todos fetched successfully");
        console.log(response.data);
        return response.data;
    }
    catch(e){
      console.error(e.message)
    }
}
export const createTodo=async(formData)=>{
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
}
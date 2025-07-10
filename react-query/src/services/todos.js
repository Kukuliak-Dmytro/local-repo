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

import { http } from "../utils/http";

export async function register({username, password, fullName}){
    try{
        const response = await http.post("/auth/register", {username, password, fullName})
        return response.data
    }
    catch(error){
        console.log(error)
    }

}

export async function login({username, password}){
    try{
        const response = await http.post("/auth/login", {username, password})
        return response.data
    }
    catch(error){
        console.log(error)
    }

}
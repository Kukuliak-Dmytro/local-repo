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

export function login(){}
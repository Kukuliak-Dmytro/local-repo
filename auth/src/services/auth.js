import { http } from "../utils/http";
import { getRefreshToken, setAccessToken, setRefreshToken } from "../utils/jwt";
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

export async function refreshToken(){
    try{
        const response = await http.post("/auth/refresh", {
            refreshToken: getRefreshToken()
        })
        console.log(response.data)
        setAccessToken(response.data.accessToken)
        setRefreshToken(response.data.refreshToken)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}
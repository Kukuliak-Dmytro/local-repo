import axios from "axios";
import { getAccessToken } from "./jwt";
import { refreshToken } from "../services/auth";
export const http =axios.create({
    baseURL:"http://localhost:3000/",
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
})

http.interceptors.request.use((config)=>{
    const token = getAccessToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
http.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const originalRequest = error.config
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true
        const data = await refreshToken()
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        console.log("Intercepted 401")
        return http(originalRequest)
    }
    return Promise.reject(error)
})
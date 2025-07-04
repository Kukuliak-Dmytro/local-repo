const API_URL = "http://localhost:3000"
import axios from "axios"
import { getAccessToken } from "./storage";
import { refreshToken } from "../services/auth";
const http= axios.create ({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,

})

http.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
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


export default http;
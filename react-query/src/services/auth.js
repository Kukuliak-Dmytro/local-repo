import http from "../utils/http";
import { saveAccessToken, saveRefreshToken, getRefreshToken } from "../utils/storage";

export const register = async (formData) => {
    const { email, password } = formData;
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const response = await http.post("/auth/register", { email, password });
        saveAccessToken(response.data.accessToken);
        saveRefreshToken(response.data.refreshToken);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }


}




export const login = async (formData) => {
    const { email, password } = formData;
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const response = await http.post("/auth/login", { email, password });
        saveAccessToken(response.data.accessToken);
        saveRefreshToken(response.data.refreshToken);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }


}

export const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.error("No refresh token found!");
    }
    try{
        const response = await http.post("/auth/refresh", {refreshToken});
        saveAccessToken(response.data.accessToken);
        saveRefreshToken(response.data.refreshToken);
        return response.data;
    }
    catch(e){
        console.error(e.message);
    }
}
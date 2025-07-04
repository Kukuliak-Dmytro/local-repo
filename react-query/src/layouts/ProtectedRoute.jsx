import { getAccessToken } from "../utils/storage";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function ProtectedRoute({ children }){
    const navigate = useNavigate();
    const accessToken = getAccessToken();
    
    useEffect(() => {
        if (!accessToken) {
            navigate("/auth/login");
            return;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
            
            if (decodedToken.exp < currentTime) {
                // Token has expired
                navigate("/auth/login");
                return;
            }
        } catch (error) {
            // Invalid token
            navigate("/auth/login");
            return;
        }
    }, [accessToken, navigate]);

    if (!accessToken) {
        return null;
    }
    
    return children;
}
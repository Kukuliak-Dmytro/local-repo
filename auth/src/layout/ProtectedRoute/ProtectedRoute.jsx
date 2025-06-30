import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../../utils/jwt";
import {jwtDecode} from "jwt-decode"; // You need to install this: npm i jwt-decode

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export default function ProtectedRoute({children}) {
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const checkSession = async () => {
      const accessToken = getAccessToken();
      if (accessToken && !isTokenExpired(accessToken)) {
        setIsValid(true);
        return;
      }
      // Try to refresh
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const data = await refreshToken();
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setIsValid(true);
          return;
        } catch {
          // Refresh failed
        }
      }
      setIsValid(false);
    };
    checkSession();
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return navigate("/login");
  return children; // or render children if you use <ProtectedRoute>{...}</ProtectedRoute>
}
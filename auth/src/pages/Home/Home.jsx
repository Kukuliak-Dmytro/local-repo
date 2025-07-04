import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import { getAccessToken, logout } from "../../utils/jwt"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"
export default function Home(){
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState(getAccessToken())
  
    const handleLogout = ()=>{
        logout()
        navigate("/login")
    }
   
    return (
        <PageWrapper >
            <h1>Home</h1>
            <span style={{display:"flex", gap:"10px"}}>
                <Link to="/profile">Profile</Link>
                <Link to="/friends">Friends</Link>
                <button onClick={handleLogout}>Logout</button>
            </span>
        </PageWrapper>
    )
}
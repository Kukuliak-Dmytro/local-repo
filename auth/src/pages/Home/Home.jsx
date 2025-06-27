import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import { getAccessToken, logout } from "../../utils/jwt"
import { useState } from "react"
import { useNavigate } from "react-router"
export default function Home(){
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState(getAccessToken())
    const handleLogout = ()=>{
        logout()
        navigate("/login")
    }
    return (
        <PageWrapper>
            <h1>Home</h1>
            <span>{accessToken}</span>
            <button onClick={handleLogout}>Logout</button>
        </PageWrapper>
    )
}
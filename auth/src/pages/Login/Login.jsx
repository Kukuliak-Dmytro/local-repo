import './Login.css'
import { login } from '../../services/auth'
import PageWrapper from '../../layout/PageWrapper/PageWrapper'
import { useState } from 'react'
import useFormState from '../../hooks/useFormState'
import { setAccessToken, setRefreshToken } from '../../utils/jwt'
import { useNavigate } from 'react-router'
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData, handleChange] = useFormState({
        username:"",
        password:"",
    })
    const handleLogin =async (e)=>{
        e.preventDefault()
        const {username, password} = formData
        const response = await login({username, password})
        console.log("User logged in successfully")
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        navigate("/")
    }
    return (
        <PageWrapper>
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login </h1>
                <input onChange={handleChange} id='username' name='username' type="text" placeholder="Nickname" value={formData.username}/>
                <input onChange={handleChange} id='password' name='password' type="password" placeholder="Password" value={formData.password}/>
                <button type="submit">Register</button>
            </form>
        </PageWrapper>
    )
    
}
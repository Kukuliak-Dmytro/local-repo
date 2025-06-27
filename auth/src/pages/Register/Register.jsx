import './Register.css'
import { register } from '../../services/auth'
import PageWrapper from '../../layout/PageWrapper/PageWrapper'
import { useState } from 'react'
import useFormState from '../../hooks/useFormState'
import { setAccessToken, setRefreshToken } from '../../utils/jwt'
import { useNavigate } from 'react-router'
export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData, handleChange] = useFormState({
        username:"",
        password:"",
        fullName:"",
    })
    const handleRegister =async (e)=>{
        e.preventDefault()
        const {username, password, fullName} = formData
        const response = await register({username, password, fullName})
        console.log("User registered successfully")
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        navigate("/")
    }
    return (
        <PageWrapper>
            <form className="register-form" onSubmit={handleRegister}>
                <input onChange={handleChange} id='fullName' name='fullName' type="text" placeholder="Full anme"  value={formData.fullName}/>
                <input onChange={handleChange} id='username' name='username' type="text" placeholder="Nickname" value={formData.username}/>
                <input onChange={handleChange} id='password' name='password' type="password" placeholder="Password" value={formData.password}/>
                <button type="submit">Register</button>
            </form>
        </PageWrapper>
    )
    
}
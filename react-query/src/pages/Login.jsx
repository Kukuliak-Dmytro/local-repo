import { useState } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { login } from "../services/auth";
import { Link } from "react-router";
import { useNavigate } from "react-router";
export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            await login(formData);
            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <PageWrapper>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-8 rounded-md border-2 border-gray-300">
                <h1>Login</h1>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <Button type="submit">Login</Button>
                <span>Don't have an account? <Link to="/auth/register" className="text-amber-500 hover:underline">Register</Link></span>
            </form>
        </PageWrapper>
    )
}
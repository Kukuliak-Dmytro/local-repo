import { useState } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { register } from "../services/auth";
import { Link } from "react-router";
import { useNavigate } from "react-router";
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            await register(formData);
            navigate("/auth/login");

        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <PageWrapper>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-8 rounded-md border-2 border-gray-300">
                <h1>Register</h1>
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
                <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                <Button type="submit">Register</Button>
                <span>Already have an account? <Link to="/auth/login" className="text-amber-500 hover:underline">Log in</Link></span>

            </form>
        </PageWrapper>
    )
}
import { Link } from "react-router";
export default function Home() {
    return (
        <div className="flex gap-4 items-center justify-center">
            <h1>Home</h1>
            <Link to="/todos">Todos</Link>
            <Link to="/auth/register">Register</Link>
            <Link to="/auth/login">Login</Link>
            <Link to='/shared'>Shared</Link>
        </div>
    )
}
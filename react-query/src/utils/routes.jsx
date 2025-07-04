import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../layouts/ProtectedRoute";
import TodosPage from "../pages/Todos";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><h1>Home</h1></ProtectedRoute>
    },
    {
        path: "auth/register",
        element: <Register />
    },
    {
        path: "auth/login",
        element: <Login />
    },
    {
        path: "todos",
        element:<TodosPage />
    }
])
export default routes;
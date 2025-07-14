import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../layouts/ProtectedRoute";
import TodosPage from "../pages/Todos";
import Home from "../pages/Home";
import Shared from "../pages/Shared";
const routes = createBrowserRouter([
    {
        path: "/",
        element:
         <ProtectedRoute>
            <Home />
        </ProtectedRoute>
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
        element:
         <ProtectedRoute>
            <TodosPage />
        </ProtectedRoute>
    },
    {
        path: "shared",
        element:
         <ProtectedRoute>
            <Shared />
        </ProtectedRoute>
    }
])
export default routes;
import { createBrowserRouter } from "react-router";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path:"/register",
        element:<Register />,
    },
    {
        path:"/login",
        element:<Login />,
    }
]);
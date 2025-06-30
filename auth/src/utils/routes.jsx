import { createBrowserRouter } from "react-router";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
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
    },
    {
        path:"/profile",
        element:<Profile />,
    }
]);
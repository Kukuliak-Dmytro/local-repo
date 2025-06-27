import { createBrowserRouter } from "react-router";
import Register from "../pages/Register/Register";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello World</h1>,
    },
    {
        path:"/register",
        element:<Register />,
    }
]);
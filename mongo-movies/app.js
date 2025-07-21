import express from "express";
import dotenv from "dotenv";
import genresRoutes from "./routes/genresRoutes.js";

const app = express();

app.use(express.json());
dotenv.config();

app.use("/genres",genresRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
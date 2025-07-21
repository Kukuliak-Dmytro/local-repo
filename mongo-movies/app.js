import express from "express";
import dotenv from "dotenv";
import genresRoutes from "./routes/genresRoutes.js";
import actorsRoutes from "./routes/actorsRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
const app = express();

app.use(express.json());
dotenv.config();

app.use("/genres",genresRoutes)
app.use("/actors",actorsRoutes)
app.use("/movies",moviesRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
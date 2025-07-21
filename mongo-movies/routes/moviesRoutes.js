import { Router } from "express";
import moviesController from "../controllers/moviesController.js";

const moviesRoutes = Router();

moviesRoutes.get("/", moviesController.getMovies);
moviesRoutes.get("/:id", moviesController.getMovieById);
moviesRoutes.post("/", moviesController.createMovie);
moviesRoutes.put("/:id", moviesController.updateMovie);
moviesRoutes.delete("/:id", moviesController.deleteMovie);

export default moviesRoutes
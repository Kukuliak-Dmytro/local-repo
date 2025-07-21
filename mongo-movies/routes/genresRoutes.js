import { Router } from "express"
import genresController from "../controllers/genresController.js"

const genresRoutes=Router()

genresRoutes.get("/",genresController.getGenres)
genresRoutes.get("/:id",genresController.getGenreById)
genresRoutes.post("/",genresController.createGenre)
genresRoutes.put("/:id",genresController.updateGenre)
genresRoutes.delete("/:id",genresController.deleteGenre)

export default genresRoutes;
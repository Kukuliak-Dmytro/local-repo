import { Router } from "express";
import genresController from "../controllers/genresController";

const router = Router();

router.get("/", genresController.getGenresHandler);
router.get("/:id", genresController.getGenreByIdHandler);
router.post("/", genresController.createGenreHandler);
router.put("/:id", genresController.updateGenreHandler);
router.delete("/:id", genresController.deleteGenreHandler);

export default router;
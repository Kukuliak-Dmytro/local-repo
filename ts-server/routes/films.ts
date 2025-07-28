import { Router } from "express";
import filmsController from "../controllers/filmsController";

const router = Router();

router.get("/", filmsController.getFilmsHandler);
router.get("/:id", filmsController.getFilmByIdHandler);
router.post("/", filmsController.createFilmHandler);
router.put("/:id", filmsController.updateFilmHandler);
router.delete("/:id", filmsController.deleteFilmHandler);

export default router; 
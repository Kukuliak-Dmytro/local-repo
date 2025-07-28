import { Router } from "express";
import gamesController from "../controllers/gamesController";

const router = Router();

router.get("/", gamesController.getGamesHandler);
router.get("/:id", gamesController.getGameByIdHandler);
router.post("/", gamesController.createGameHandler);
router.put("/:id", gamesController.updateGameHandler);
router.delete("/:id", gamesController.deleteGameHandler);

export default router; 
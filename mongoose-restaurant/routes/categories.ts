import { Router } from "express";
import categoriesController from "../controllers/categories";

const router = Router();

router.post("/", categoriesController.createCategory);

export default router;
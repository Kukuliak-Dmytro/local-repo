import { Router } from "express";
import dishesController from "../controllers/dishes";

const router = Router();

router.post("/", dishesController.createDish);
router.get("/", dishesController.getDishes);
router.get("/with-ingredients", dishesController.getDishesWithIngredients);
router.get("/:id", dishesController.getDishById);

export default router;
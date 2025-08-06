import { Router } from "express";
import IngredientsController from "../controllers/ingredients";

const router=Router();

router.get("/", IngredientsController.getAllIngredients);
router.get("/:id", IngredientsController.getIngredientById);
router.post("/", IngredientsController.createIngredient);
router.put("/:id", IngredientsController.updateIngredient);
router.delete("/:id", IngredientsController.deleteIngredient);
export default router;



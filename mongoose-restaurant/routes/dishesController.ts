import { Router } from "express";
import dishesController from "../controllers/dishes";

const router = Router();

router.post("/", dishesController.createDish);
router.get("/", dishesController.getDishes);
router.get("/categories", dishesController.listCategories); // Debug endpoint
router.get("/:id", dishesController.getDishById);
router.put("/:id", dishesController.updateDish);
router.delete("/:id", dishesController.deleteDish);

export default router;
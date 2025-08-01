import { Router } from "express";
import categoriesController from "../controllers/categories";

const router = Router();

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

export default router;
import { Router } from "express";
import booksController from "../controllers/booksController";

const router = Router();

router.get("/", booksController.getBooksHandler);
router.get("/:id", booksController.getBookByIdHandler);
router.post("/", booksController.createBookHandler);
router.put("/:id", booksController.updateBookHandler);
router.delete("/:id", booksController.deleteBookHandler);

export default router;
import { Router } from "express";
import OrdersController from "../controllers/orders";

const router = Router();

router.post("/", OrdersController.createOrder);

export default router;

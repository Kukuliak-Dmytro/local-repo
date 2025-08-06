import { Router } from "express";
import OrdersController from "../controllers/orders";

const router = Router();

router.post("/", OrdersController.createOrder);
router.get("/", OrdersController.getOrders);
router.get("/:id", OrdersController.getOrderById);
router.patch("/:id/status", OrdersController.changeOrderStatus);
router.patch("/:id/items/add", OrdersController.addItemToOrder);
router.patch("/:id/items/delete", OrdersController.deleteItemFromOrder);
router.delete("/:id", OrdersController.deleteOrder);

export default router;


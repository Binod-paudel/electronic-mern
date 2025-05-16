import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrdes,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { checkAuth, checkAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, getOrdes);
router.get("/myorders", checkAuth, getMyOrders);
router.put("/:id/updatestatus", checkAuth, checkAdmin, updateOrderStatus);
router.get("/:id", checkAuth, getOrderById);

export default router;

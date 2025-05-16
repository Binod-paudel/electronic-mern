import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrdes,
} from "../controllers/order.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, getOrdes);
router.get("/myorders", checkAuth, getMyOrders);
router.get("/:id", checkAuth, getOrderById);


export default router;

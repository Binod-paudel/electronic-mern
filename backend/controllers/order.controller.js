import Order from "../models/order.model";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";

const addOrder = asyncHandler(async (req, res) => {
  let { orderItems, itemPrice, shippingCharge, totalPrice, shippingAddress } =
    req.body;
  let order = await Order.create({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      prodcut: item._id,
      user: undefined,
    })),
  });
});

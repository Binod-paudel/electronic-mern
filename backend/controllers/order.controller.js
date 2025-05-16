import Order from "../models/order.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// @desc   Create a new order
// @route  POST /api/v4/orders
// @access Private
const addOrder = asyncHandler(async (req, res) => {
  let { orderItems, itemPrice, shippingCharge, totalPrice, shippingAddress } =
    req.body;
  let order = await Order.create({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    itemPrice,
    shippingCharge,
    totalPrice,
    shippingAddress,
  });
  res.send({
    message: "Order placed with id" + order._id,
    orderId: order._id,
  });
});

//@desc get orders
//@route GET/api/v4/orders
//@access private
const getOrdes = asyncHandler(async (req, res) => {
  let orders = await Order.find({}).populate("user", "name email -_id");
  res.send(orders);
});

//@desc get order by ID
//@route GET/api/v4/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let orders = await Order.findById(id).populate("user", "name email -_id");
  res.send(orders);
});

//@desc get my order
//@route GET/api/v4/orders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let status = req.body.status;
  let order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not Found!");
  order.status = status;
  if (status == "delivered") {
    order.isDelivered = true;
    order.isPaid = true;
    order.deliveredAt = Date.now();
  }
  order.save();
  res.send({ message: "Order status changed to " + order.status });
});

export { addOrder, getOrdes, getOrderById, getMyOrders, updateOrderStatus };

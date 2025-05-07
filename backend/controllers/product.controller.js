import Product from "../models/product.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/apiError.js";

//@desc get all products
//@route POST/api/v4/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

//@desc get product by id
//@route api/v4/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }
  res.send(product);
});


//@desc add new product
//@route /api/v4/product
//@access private/admin
const addProduct = asyncHandler(async (req, res) => {
  let product = await Product.create({ ...req.body, user: req.user._id });
  res.send({ message: "Product created successfully!" });
});

export { getProducts, getProductById, addProduct };

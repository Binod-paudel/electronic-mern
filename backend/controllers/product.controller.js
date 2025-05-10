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

// @desc add new product
// @route /api/v4/products
// @access private/admin
const addProduct = asyncHandler(async (req, res) => {
  // let product = await Product.create({ ...req.body, user: req.user._id });
  let product = await Product.create({
    user: req.user._id,
    name: "Sample Product",
    description: "Sample Description",
    image: "/images/sample.jpg",
    price: 0,
    brand: "Sample Brand",
    category: "Sample category",
  });
  res.send({ message: "Product created successfully!", product });
});

//@desc update product
//@route /api/v4/products
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }
  (product.name = req.body.name || product.name),
    (product.description = req.body.description || product.description),
    (product.brand = req.body.brand || product.brand),
    (product.category = req.body.category || product.category),
    (product.image = req.body.image || product.image),
    (product.price = req.body.price || product.price),
    (product.countInStock = req.body.countInStock || product.countInStock);

  let updatedProduct = await product.save();

  res.send({ message: "product updated successfully!", updatedProduct });
});

//@desc delete product
//@route /api/v4/products
//@access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "product not found!");
  }
  await Product.findByIdAndDelete(product);

  res.send({ message: "product deleted successfully!" });
});

//@desc get top ratedproducts
//@route /api/v4/products/topproducts/:limit
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
  let limit = Number(req.params.limit);
  let products = await Product.find({}).sort({ rating: -1 }).limit(limit);
  res.send(products);
});

//desc add user review
//route /api/v4/products/review
//@access public

const addUserReviews = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not Found!");
  }
  let alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    throw new ApiError(400, "Already reviewed!");
  }
  let { rating, comment } = req.body;
  product.reviews.push({
    name: req.user.name,
    rating,
    comment,
    user: req.user._id,
  });
  product.numReviews = product.reviews.length;
  let totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  product.rating = (totalRating/product.reviews.length).toFixed(2);
  await product.save();

  res.send({ message: "Review added successfully!" });

});

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  addUserReviews
};

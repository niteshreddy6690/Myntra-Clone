const httpStatus = require("http-status");
const WhishList = require("../models/Wishlist");
const catchAsync = require("../utils/catchAsync");
const productServices = require("../services/productServices");
const ApiError = require("../utils/ApiError");

const addItemToWishList = catchAsync(async (req, res) => {
  const product = await productServices.getProductId(req.body.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  const containProductInWishlist = await WhishList.findOne({
    wishlistProduct: product._id,
  });
  if (containProductInWishlist) {
    throw new ApiError(httpStatus.FOUND, "Product is already in wishlist");
  }
  const wlist = WhishList.create({ wishlistProduct: product });
  res.status(httpStatus.CREATED).send(wlist);
});

const getWishlist = catchAsync(async (req, res) => {
  console.log("callinfg get Wishlist");
  const wishlistproducts = await WhishList.find().populate("wishlistProduct");
  res.status(httpStatus.OK).send(wishlistproducts);
});

const removeProductFromWishlist = catchAsync(async (req, res) => {
  console.log("req.params.id", req.params.id);
  const removedProduct = await WhishList.findByIdAndDelete({
    _id: req.params.id,
  }).populate({ path: "wishlistProduct" });
  res.status(httpStatus.OK).send({ removedProduct });
});

const findProductInWishlist = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const product = await WhishList.findOne({
    wishlistProduct: req.params.id,
  });

  console.log(product);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found in wishlist");
  }
  res.status(httpStatus.OK).send(product);
});
module.exports = {
  addItemToWishList,
  getWishlist,
  removeProductFromWishlist,
  findProductInWishlist,
};

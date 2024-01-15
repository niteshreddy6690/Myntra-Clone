const Product = require("../models/Product");
const productService = require("../services/productServices");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
//Get Product Id
const getProductId = catchAsync(async (req, res) => {
  try {
    
    
    const product = await Product.findById(req.params.id).populate([
      "categories",
    ]);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update the Product By Product Id
const updateProductByProductId = catchAsync(async (req, res) => {
  
  const product = await productService.getProductId(req.params.id);
  if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  const updatedProduct = await productService.updateProductById(
    req.params.id,
    req.body
  );
  if (!updatedProduct)
    throw new ApiError(httpStatus.BAD_REQUEST, "failed to update the Product");
  res.status(httpStatus.OK).json(updatedProduct);
});

const getSimilarProductByProductId = catchAsync(async (req, res) => {
  const similarProducts = await productService.getSimilarProduct(req.params.id);
  if (!similarProducts) throw new ApiError(httpStatus.NOT_FOUND);

  res.status(httpStatus.OK).json(similarProducts);
});

// delete product dy Id
const deleteProductByProductId = catchAsync(async (req, res) => {
  
  const deletedProduct = await productService.deleteProductById(req.params.id);
  if (!deletedProduct)
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found");
  res.status(httpStatus.OK).json(deletedProduct);
});

module.exports = {
  getProductId,
  updateProductByProductId,
  getSimilarProductByProductId,
  deleteProductByProductId,
};

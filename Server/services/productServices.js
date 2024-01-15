const Product = require("../models/Product");
const mongoose = require("mongoose");
//Get Product Id
const getProductId = async (id) => {
  return Product.findById(id).populate("reviews");
};

const updateProductById = async (id, bodyData) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $set: bodyData,
    },
    { new: true }
  );
};

const getSimilarProduct = async (id) => {
  const product = await Product.findById(id).populate([
    "categories",
    "reviews",
  ]);

  
  const SimilarBrandProduct = await Product.find({
    _id: { $ne: product.id },
    categories: product.categories._id,
    gender: product.gender,
    brand: product.brand,
  }).populate("categories");

  const SimilarColorProduct = await Product.find({
    _id: { $ne: product.id },
    gender: product.gender,
    color: product.color,
    categories: product.categories._id,
  });

  const SimilarCategoryProducts = await Product.find({
    _id: { $ne: product.id },
    categories: product.categories._id,
    gender: product.gender,
  });
  return { SimilarBrandProduct, SimilarColorProduct, SimilarCategoryProducts };
};

const deleteProductById = async (id) => {
  return Product.findByIdAndDelete(id);
};
module.exports = {
  getProductId,
  updateProductById,
  getSimilarProduct,
  deleteProductById,
};

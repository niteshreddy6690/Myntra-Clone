const Product = require("../models/Product");

//Get Product Id
const getProductId = async (id) => {
  return Product.findById(id).populate("reviews");
};

module.exports = {
  getProductId,
};

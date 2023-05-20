const Product = require("../models/Product");

//Get Product Id
const getProductId = async (req, res) => {
  try {
    console.log("PID", req.params.id);
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { getProductId };

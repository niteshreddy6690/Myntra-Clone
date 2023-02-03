const router = require("express").Router();
const Product = require("../models/Product");

const productController = require("../controllers/productController");

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET All Products
// GET Category Products
// GET New Product
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  console.log("calling by category");
  console.log("qCategory :", qCategory);
  try {
    let products;
    // qCategory = qCategory.split(",");

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(20);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product Id
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/find/:id", productController.getProductId);

// PAGINATION

router.get("/prod", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    let brand = req.query.Brand || "";
    let gender = req.query.Gender || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    brand = brand.split(",");
    console.log(brand);
    const product = await Product.find({
      categories: { $in: brand },
    })
      .skip(page * limit)
      .limit(limit);

    // const total = await Product.countDocuments({
    //   categories: { $regex: search, $options: "i" },
    // });

    res.status(200).json({ error: false, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

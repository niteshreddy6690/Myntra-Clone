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
  const { brand, gender, sort } = req.query;
  const qNew = req.query.new;
  const qCategory = req.query.category;

  const queryObject = {};
  console.log("calling by category");
  console.log("qCategory :", qCategory);

  if (brand) {
    queryObject.brand = { $in: brand.split(",") };
  }
  if (gender) {
    console.log("Gender", gender);
    queryObject.gender = gender;
  }
  let apiData = Product.find(queryObject);
  if (sort) {
    const sortDic = {
      recommended: "",
      new: "-createdAt",
      popularity: "popularity",
      discount: "-discountPercentage",
      price_desc: "-price",
      price_asc: "price",
    };

    // let entries = Object.entries(sortDic);
    // let data = entries.map(([key, val]) => {
    //   if (key == sort) {
    //     return val;
    //   }
    // });

    let sortFix = sortDic[sort];
    apiData = apiData.sort(sortFix);
    // queryObject.sort = sortFix;
    console.log("SortFix", sortFix);
  }
  let page = parseInt(req.query.p) - 1 || 0;
  let limit = parseInt(req.query.limit) || 50;

  apiData = apiData.skip(page * limit).limit(limit);
  console.log("Query Object", queryObject);
  try {
    let products;

    // qCategory = qCategory.split(",");

    // if (qNew) {
    //   products = await Product.find().sort({ createdAt: -1 }).limit(20);
    // } else if (queryObject) {
    //   // products = await Product.find({
    //   //   categories: {
    //   //     $in: [qCategory],
    //   //   },
    //   // }).sort({ createdAt: -1 });
    //   console.log("calling filter");
    //   products = await Product.find(queryObject);
    // } else {
    //   products = await Product.find();
    // }
    products = await apiData;
    let totalProduct = await Product.find(queryObject);
    // Product.find(queryObject);
    // console.log(products);
    res
      .status(200)
      .json({ products, totalPages: Math.ceil(totalProduct.length / 5) });
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

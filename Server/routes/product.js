const router = require("express").Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const productController = require("../controllers/productController");
const { roles } = require("../utils/Constants");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");

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
router.get("/:combineCategory", async (req, res) => {
  console.log("req.query", req.query);

  const { brand, gender, sort, colors, price, discount } = req.query;
  const { combineCategory } = req.params;
  console.log("cat", req.params.combineCategory);
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const queryObject = {};
  // console.log("qCategory :", qCategory);
  // if (combineCategory) {
  //   console.log("calling by combineCategory");
  //   const index = combineCategory.indexOf("-");
  //   const firstPart =
  //     index !== -1 ? combineCategory?.slice(0, index) : combineCategory;
  //   const secondPart =
  //     index !== -1 ? combineCategory?.slice(index + 1).replace(/-/g, " ") : "";
  //   console.log(firstPart); // "I like"
  //   console.log(secondPart);
  //   const combinedArray = [];
  //   console.log("secondPart", secondPart);
  //   combinedArray.push(firstPart);
  //   if (secondPart) combinedArray.push(secondPart);
  //   console.log(combinedArray);

  //   const keywords = ["men", "tshirt"];

  //   // const result = await Category.find({
  //   //   categoryPath: { $in: keywords.map((keyword) => ({ $regex: keyword })) },
  //   // });

  //   const regexKeywords = combinedArray.map(
  //     (keyword) => new RegExp(keyword, "i")
  //   );
  //   console.log("regexKeywords", regexKeywords);

  //   // const result = await Category.find({
  //   //   categoryPath: { $all: regexKeywords },
  //   // });
  //   // console.log("result", result);
  //   const result1 = await Category.findOne({
  //     $and: [
  //       { categoryPath: { $all: regexKeywords } },
  //       { name: regexKeywords[1] },
  //     ],
  //   });

  //   console.log("result1", result1);

  //   console.log(await Category.find({ categoryPath: "tshirt" }));

  //   console.log(
  //     await Category.find({ categoryPath: { $regex: keywords.join(".*") } })
  //   );
  //   queryObject.categories = await result1?._id;
  // }

  // if (!queryObject.categories) {
  //   queryObject.categories = {};
  // }

  // // Assign the value to categoryPath
  // queryObject.categories.categoryPath = "hvjhbjhbhv";

  if (brand) {
    queryObject.brand = { $in: brand.split(",") };
  }
  if (gender) {
    queryObject.gender = gender;
  }
  if (colors) {
    console.log("Gender", colors);
    queryObject.color = { $in: colors.split(",") };
  }

  // console.log(
  //   "Product",
  //   await Product.find({
  //     discountPercentage: { $gte: 50 },
  //   })
  // );

  // data = "{price:{$gte:1699 ,$lte: 2999}}";

  // obj = JSON.parse(data);

  // console.log(obj);

  if (price) {
    let priceArray = price.split(",").map((p) => {
      let pri = p.split("to");
      return {
        price: { $gte: Number(pri[0].trim()), $lte: Number(pri[1].trim()) },
      };
    });
    tempObj = {
      $or: priceArray.map((p) => {
        return p;
      }),
    };

    Object.assign(queryObject, tempObj);
  }

  if (discount) {
    queryObject.discountPercentage = {
      $gte: Number(discount.split("%")[0].trim()),
    };
  }
  console.log("queryObject", queryObject);
  let apiData = Product.find(queryObject).populate("categories");

  if (sort) {
    const sortDic = {
      recommended: "-createdAt",
      new: "createdAt",
      popularity: "-noOfRatings",
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
    // console.log(
    //   "Product",
    //   await Product.find({
    //     // $or: [
    //     //   { price: { $gte: 501, $lte: 1000 } },
    //     //   { price: { $gte: 201, $lte: 1500 } },
    //     // ],
    //     $or: [
    //       "{price:{$gte:1699 ,$lte: 2999}}",
    //       "{price:{$gte:399 ,$lte: 1699}}",
    //     ],
    //   })
    // );
    let sortFix = sortDic[sort];
    apiData = apiData.sort(sortFix);
    // queryObject.sort = sortFix;
    console.log("SortFix", sortFix);
  }
  let page = parseInt(req.query.p) - 1 || 0;
  let limit = parseInt(req.query.limit);

  apiData = apiData.skip(10 * limit).limit(limit);
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
    // console.log("apidata", products);
    // const toalP = await Product.countDocuments({ categories: qCategory });
    // console.log("toalP", toalP);
    let totalProduct = await Product.find(queryObject);
    // Product.find(queryObject);
    console.log(products);
    res
      .status(200)
      .json({ products, totalPages: Math.ceil(totalProduct.length / 20) });
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
    // const page = parseInt(req.query.page) - 1 || 0;
    // const limit = parseInt(req.query.limit) || 5;
    // let brand = req.query.Brand || "";
    // let gender = req.query.Gender || "";
    // let sort = req.query.sort || "-createdAt";
    // let genre = req.query.genre || "All";

    // brand = brand.split(",");
    // console.log(brand);
    const product = await Product.find({
      categories: { $in: brand },
    });
    // .skip(page * limit)
    // .limit(limit);

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
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ err: err });
//   }
// });

router.put(":/id", productController.updateProductByProductId);

// related Product
router.get("/related/:id", productController.getSimilarProductByProductId);

// get All Products
router.get("/", async (req, res) => {
  console.log("get all products");
  const product = await Product.find({}).populate("categories");
  res.status(200).json(product);
});

// Auto suggest
router.get("/search/autosuggest", async (req, res) => {
  const { q } = req.query;
  const searchBrand = await Product.find({
    $or: [{ brand: { $regex: q } }],
  });
  const searchCategory = await Category.find({
    $or: [{ name: { $regex: q } }],
  });

  console.log("req.headers.host", req.headers.host);
  res
    .status(200)
    .json({ searchBrand: searchBrand, searchCategory: searchCategory });
});

// delete Product
router.delete("/:id", productController.deleteProductByProductId);

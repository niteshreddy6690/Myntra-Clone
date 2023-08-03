const router = require("express").Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const productController = require("../controllers/productController");
const { roles } = require("../utils/Constants");
const { authorize } = require("../middleware/verifyToken");
const stringSimilarity = require("string-similarity");

// GET All Products
// GET Category Products
// GET New Product

router.get("/:combineCategory", async (req, res) => {
  console.log("req.query", req.query);
  const { brand, gender, sort, colors, price, discount } = req.query;
  const { combineCategory } = req.params;
  function extractGenderFromTshirtString(InputDynamicString) {
    const genderKeywords = ["men", "women", "girls", "boys", "unisex"];
    const matches = InputDynamicString.match(/\b\w+\b/gi);

    if (!matches) {
      return { genderData: null, remainingString: InputDynamicString };
    }

    const similarities = genderKeywords.map((keyword) =>
      stringSimilarity.findBestMatch(
        keyword.toLowerCase(),
        matches.map((match) => match.toLowerCase())
      )
    );
    const bestMatch = similarities.reduce((prev, current) =>
      prev.bestMatch.rating > current.bestMatch.rating ? prev : current
    );
    if (bestMatch.bestMatch.rating >= 0.6) {
      const gender = bestMatch.bestMatch.target;
      const genderRegex = new RegExp(`\\b${gender}(?:'s)?\\b`, "gi");
      let remainingString = InputDynamicString?.replace("-", " ")
        .replace(new RegExp(`\\b${gender}(?:'s)?\\b`, "gi"), "")
        .trim();
      remainingString = remainingString?.replace("-", " ");
      console.log("remaining string: " + remainingString);
      return { genderData: gender.toLowerCase(), remainingString };
    } else {
      return { genderData: null, remainingString: InputDynamicString };
    }
  }

  const { genderData, remainingString } =
    extractGenderFromTshirtString(combineCategory);
  console.log("genderData", genderData, "remainingString", remainingString);
  console.log("cat", req.params.combineCategory);
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const queryObject = {};
  console.log("qCategory :", qCategory);

  if (combineCategory && remainingString) {
    const categoryWords = remainingString.split("-");
    const regexKeywords = categoryWords.map(
      (keyword) => new RegExp(keyword, "i")
    );
    console.log("keyword", regexKeywords);

    console.log("remainingString", remainingString);
    const category = await Category.findOne({ name: remainingString });

    console.log("category identified", category);
    if (!category) {
      const result = await Category.find({
        $or: [
          {
            categoryPath: {
              $in: regexKeywords,
            },
          },
          // { name: { $in: regexKeywords } },
          // { namepath: { $in: regexKeywords } },
        ],
      });
      console.log("result", result);
      console.log(result.map((res) => res?._id));
      queryObject.categories = { $in: result.map((res) => res?._id) };
    } else if (category?.categoryTypes && category?.categoryTypes?.length > 0) {
      // If the category has associated product types, use them in the query
      queryObject.categories = { $in: category.categoryTypes };
    } else {
      // If the category doesn't have associated product types, fetch all products of that category
      // products = await Product.find({ gender, category: category._id });
      // console.log("calling else conditioan");
      // const ChildrenCategories = await Category.find({
      //   parentId: category._id,
      // });
      // console.log("ChildrenCategories", ChildrenCategories);
      queryObject.categories = { $in: category._id };
    }

    // const result = await Category.find({
    //   $or: [
    //     {
    //       categoryPath: {
    //         $in: regexKeywords,
    //       },
    //     },
    //     // { name: { $in: regexKeywords } },
    //     // { namepath: { $in: regexKeywords } },
    //   ],
    // });
    // console.log(
    //   await Category.find({
    //     $or: [
    //       {
    //         categoryPath: {
    //           $in: [/ethnic/i],
    //         },
    //       },
    //       { name: { $in: [/ethnic/i] } },
    //       { namepath: { $in: [/ethnic/i] } },
    //     ],
    //   })
    // );
    // console.log("result", result);
    // console.log(result.map((res) => res?._id));
    // const result1 = await Category.findOne({
    //   $and: [
    //     { categoryPath: { $all: regexKeywords } },
    //     { name: regexKeywords[1] },
    //     { namepath: regexKeywords[0] },
    //   ],
    // });

    // queryObject.categories = { $in: result.map((res) => res?._id) };
  }
  // if (combineCategory) {
  //   console.log("calling by combineCategory");

  //   const index = combineCategory.indexOf("-");
  //   const firstPart =
  //     index !== -1 ? combineCategory?.slice(0, index) : combineCategory;
  //   const secondPart = index !== -1 ? combineCategory?.slice(index + 1) : "";

  //   const categoryWords = combineCategory.split("-");
  //   console.log(categoryWords);
  //   // .replace(/-/g, " ")
  //   console.log(firstPart); // "I like"
  //   console.log(secondPart);

  //   const combinedArray = [];
  //   console.log("secondPart", secondPart);
  //   combinedArray.push(firstPart);
  //   if (secondPart) combinedArray.push(secondPart);
  //   console.log(combinedArray);

  //   // const result = await Category.find({
  //   //   categoryPath: { $in: keywords.map((keyword) => ({ $regex: keyword })) },
  //   // });

  //   const regexKeywords = categoryWords.map(
  //     (keyword) => new RegExp(keyword, "i")
  //   );
  //   console.log("keyword", regexKeywords);
  //   const result = await Category.find({
  //     $or: [
  //       {
  //         categoryPath: {
  //           $in: categoryWords,
  //         },
  //       },
  //       { name: { $in: categoryWords } },
  //       { namepath: { $in: categoryWords } },
  //     ],
  //   });
  //   console.log("result", result);

  //   console.log("regexKeywords", regexKeywords);

  //   // const result = await Category.find({
  //   //   categoryPath: { $all: regexKeywords },
  //   // });
  //   // console.log("result", result);
  //   const result1 = await Category.findOne({
  //     $and: [
  //       { categoryPath: { $all: regexKeywords } },
  //       { name: regexKeywords[1] },
  //       { namepath: regexKeywords[0] },
  //     ],
  //   });

  //   // console.log("result1", result1);

  //   // console.log(await Category.find({ categoryPath: "tshirt" }));

  //   // console.log(
  //   //   await Category.find({ categoryPath: { $regex: keywords.join(".*") } })
  //   // );
  //   queryObject.categories = await result1?._id;
  // }
  // // Assign the value to categoryPath
  // queryObject.categories.categoryPath = "hvjhbjhbhv";

  if (brand) {
    queryObject.brand = { $in: brand?.split(",") };
  }
  if (gender || genderData) {
    queryObject.gender = gender;
    queryObject.gender = gender ? gender : genderData;
  }
  if (colors) {
    queryObject.color = { $in: colors?.split(",") };
  }

  if (price) {
    let priceArray = price?.split(",").map((p) => {
      let pri = p?.split("to");
      console.log("Pri", pri);
      return {
        mrp: { $gte: Number(pri[0]?.trim()), $lte: Number(pri[1]?.trim()) },
      };
    });
    console.log("PriceArray", priceArray[0]);
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
      price_desc: "-mrp",
      price_asc: "mrp",
    };

    let sortFix = sortDic[sort];
    apiData = apiData.sort(sortFix);
    // queryObject.sort = sortFix;
    console.log("SortFix", sortFix);
  }
  let page = parseInt(req.query.p) - 1 || 0;
  let limit = parseInt(req.query.limit);

  apiData = apiData.skip(10 * limit).limit(limit);
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

    res
      .status(200)
      .json({ products, totalPages: Math.ceil(totalProduct.length / 20) });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product Id
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

// create product
router.post("/", authorize(roles.admin), async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE PRODUCT
router.put(
  "/:id",

  productController.updateProductByProductId
);

// delete Product
router.delete(
  "/:id",
  authorize(roles.admin),
  productController.deleteProductByProductId
);

module.exports = router;

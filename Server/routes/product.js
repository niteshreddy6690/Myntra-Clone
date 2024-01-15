const router = require("express").Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const productController = require("../controllers/productController");
const { roles } = require("../utils/Constants");
const { authorize } = require("../middleware/verifyToken");
const stringSimilarity = require("string-similarity");

// GET All Products
// GET Category Products
// GET New Product

router.get("/:combineCategory", async (req, res) => {
  const { brand, gender, sort, colors, price, discount,rawQuery } = req.query;
  const { combineCategory } = req.params;
  var page = parseInt(req.query.p) - 1 || 0;
  var limit = parseInt(req.query.limit) || 33;

  let genderData=null;
  let remainingString=null
  const queryObject = {};
  if(!rawQuery){
  function extractGenderFromString(InputDynamicString) {
    const genderKeywords = ["men", "women", "girls", "boys", "unisex"];
    const matches = InputDynamicString.match(/\b\w+\b/gi);
    if (!matches) {
      return {
        genderData: null,
        remainingString: InputDynamicString.replace("-", " "),
      };
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
      
      return { genderData: gender.toLowerCase(), remainingString };
    } else {
      return {
        genderData: null,
        remainingString: InputDynamicString.replace("-", " "),
      };
    }
  }

  const genderDataAndRemainingString  =
  extractGenderFromString(combineCategory);
  genderData=genderDataAndRemainingString?.genderData;
  remainingString=genderDataAndRemainingString?.remainingString;

  if (combineCategory && remainingString && !rawQuery) {
    
    const categoryWords = remainingString.split("-");
    const regexKeywords = categoryWords.map(
      (keyword) => new RegExp(keyword, "i")
    );
    let category = await Category.findOne({
      $or: [{ namepath: combineCategory },{name:combineCategory}],
    });

    

    if (!category) {  
      category = await Category.find({
        name: remainingString,
      });
      
    }
    if (!category) {
      const result = await Category.find({
        $or: [
          {
            categoryPath: {
              $in: regexKeywords,
            },
            name:{$in: regexKeywords}
          },
        ],
      });
      
      
      queryObject.categories = { $in: result?.map((res) => res?._id) };
    } else if (category?.categoryTypes?.length > 0) {
      // If the category has associated product types, use them in the query
      
      queryObject.categories = {
        $in: category.categoryTypes,
      };
    } else {
      // If the category doesn't have associated product types, fetch all products of that category
      // products = await Product.find({ gender, category: category._id });
      // 
      // const ChildrenCategories = await Category.find({
      //   parentId: category._id,
      // });

      if(category?.length>0){
        queryObject.categories = {  $in: category?.map((res) => res?._id) };
      }else{
        queryObject.categories = {  $in: [category]?.map((res) => res?._id) };
      }
    }
  }
  
}

  if (gender || genderData) {
    queryObject.gender = gender;
    queryObject.gender = gender ? gender : genderData;
  }

  if(rawQuery){
    const searchCategory = await Category.find({
      $or: [
        {categoryPath:{ $regex: new RegExp(rawQuery, 'i')} }
        ,{ name: { $regex: new RegExp(rawQuery, 'i')}},
        {namepath:{ $regex: new RegExp(rawQuery, 'i')}}],
    });
    if(searchCategory.length>0) { 
      queryObject.categories = { $in: searchCategory.map((res) => res?._id) };
    }
   const searchBrand=await Brand.find({ 
    $or: [{ name: { $regex: new RegExp(rawQuery, 'i')}}]
  })
   if(!searchCategory.length>0 && searchBrand.length>0)
    { 
      queryObject.brand={$in:searchBrand?.map((res) => res?.name)}
  }
  if(!searchCategory.length>0 && !searchBrand?.length>0){
    queryObject.description= {$regex: new RegExp(rawQuery, 'i') } 
  }
}

  var ProductsWithoutAnyQueryParams = await Product.find(queryObject).populate("categories");

  if (brand) {
    queryObject.brand = { $in: brand?.split(",") };
  }

  if (colors) {
    queryObject.color = { $in: colors?.split(",") };
  }

  if (price) {
    let priceArray = price?.split(",").map((p) => {
      let pri = p?.split("to");
      
      return {
        mrp: { $gte: Number(pri[0]?.trim()), $lte: Number(pri[1]?.trim()) },
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


  
  let apiData = Product.find(queryObject).populate("categories");

  if (sort) {
    const sortDic = {
      recommended: "-createdAt",
      new: "createdAt-",
      popularity: "-noOfRatings",
      discount: "-discountPercentage",
      price_desc: "-mrp",
      price_asc: "mrp",
    };

    let sortFix = sortDic[sort];
    apiData = apiData.sort(sortFix);
    // queryObject.sort = sortFix;
    
  }

  apiData = apiData.skip(page * limit).limit(limit);
  try {
    let products;
    products = await apiData;
    
    let totalProduct = await Product.find(queryObject);


    // filter items
    const colors = Object.entries(
      ProductsWithoutAnyQueryParams?.map((item) => {
        return item?.color;
      })
        .filter(Boolean)
        .reduce(
          (colorFrequency, color) => (
            (colorFrequency[color] = (colorFrequency[color] || 0) + 1),
            colorFrequency
          ),
          {}
        )
    )
      .map(([color, frequency]) => ({ color, frequency }))
      .filter(Boolean);

    const prices = [
      ...new Set(
        ProductsWithoutAnyQueryParams?.map((item) => {
          return item?.mrp;
        })
      ),
    ]
      .filter(Boolean)
      ?.map((key) => key)
      .filter(Boolean);

    const rangePrice = (data) => {
      const noOfRanges = 15;
      const min = Math.min(...data);
      const max = Math.max(...data);
      const avg = Math.ceil((max - min) / noOfRanges);

      const ranges = Array.from({ length: noOfRanges }, (_, i) => ({
        min: min + avg * i,
        max: min + avg * (i + 1),
        numbers: [],
      }));

      data.forEach((number) => {
        for (let i = 0; i < noOfRanges; i++) {
          const range = ranges[i];
          if (number >= range.min && number < range.max) {
            range.numbers.push(number);
            break;
          }
        }
      });

      // Remove ranges with no numbers
      const filteredRanges = ranges.filter((range) => range.numbers.length > 0);

      return filteredRanges;
    };

    const priceRanges = rangePrice(prices);

    const discountRange = [
      ...new Set(
        ProductsWithoutAnyQueryParams?.map((item) => {
          return item?.discountPercentage;
        })
      ),
    ]
      .filter(Boolean)
      ?.map((key) => {
        if (key % 10 == 0) return key;
      })
      .sort()
      .filter(Boolean);

    function filterUniqueBrandsWithFrequency(brandArray) {
      const brandFrequency = {};
      for (const brand of brandArray) {
        if (brand in brandFrequency) {
          brandFrequency[brand] += 1;
        } else {
          brandFrequency[brand] = 1;
        }
      }

      const resultArray = [];
      for (const brand in brandFrequency) {
        resultArray.push({
          brandName: brand,
          frequency: brandFrequency[brand],
        });
      }

      return resultArray;
    }

    const brandData = filterUniqueBrandsWithFrequency(
      ProductsWithoutAnyQueryParams?.map((item) => {
        return item.brand;
      })
    );

    const gender = [
      ...new Set(
        ProductsWithoutAnyQueryParams?.map((item) => {
          return item?.gender;
        })
      ),
    ]
      ?.filter(Boolean)
      ?.map((key) => key)
      .filter(Boolean);
    

    // Product.find(queryObject);

    res.status(200).json({
      products,
      filters: { gender, brandData, colors, priceRanges, discountRange },
      ProductsWithoutAnyQueryParams,
      totalPages: Math.ceil(totalProduct.length / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product Id
router.get("/find/:id", productController?.getProductId);

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
    // 
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
    
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// related Product
router.get("/related/:id", productController.getSimilarProductByProductId);

// get All Products
router.get("/", async (req, res) => {
  
  const product = await Product.find({}).populate("categories");
  res.status(200).json(product);
});

// Auto suggest
router.get("/search/autosuggest", async (req, res) => {
  const { q } = req.query;
  const searchBrand = await Product.find({
    $or: [{ brand: { $regex: new RegExp(q, 'i')} }],
  });
  const searchCategory = await Category.find({
    $or: [{ name: { $regex: new RegExp(q,'i') } }],
  });

  // 
  res
    .status(200)
    .json({ searchBrand:  [...new Set(searchBrand.map((item)=> item?.brand))], searchCategory: [...new Set(searchCategory)] });
});

// create product
router.post("/", authorize(roles.admin), async (req, res) => {
  const newProduct = new Product(req.body);
  
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE PRODUCT
router.put(
  "/:id",productController.updateProductByProductId
);

// delete Product
router.delete(
  "/:id",
  authorize(roles.admin),
  productController.deleteProductByProductId
);

module.exports = router;

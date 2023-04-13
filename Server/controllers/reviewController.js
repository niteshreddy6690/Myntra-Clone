const Review = require("../models/ReviewAndRatings");
const productService = require("../services/productServices");
const userService = require("../services/userServices");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

exports.addReviewToProduct = catchAsync(async (req, res) => {
  console.log("calling add review");
  const { productId, userId, comment, ratingNo } = req.body;
  let product = await productService.getProductId(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  const alreadyReviewedByUser = await Review.findOne({
    user: userId,
    productId,
  });

  if (alreadyReviewedByUser)
    await Review.findOneAndUpdate(
      {
        user: userId,
        productId,
      },
      { rating: ratingNo, comment },
      { new: true }
    );
  // res.status(httpStatus.ALREADY_REPORTED).send(alreadyReviewedByUser);
  else if (product && user) {
    console.log("adding a new review");
    const review = await Review.create({
      productId,
      rating: ratingNo,
      comment,
      user: user,
    });
    const rateProd = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { reviews: review.id },
      },
      {
        new: true,
      }
    ).populate("reviews");
    console.log("rateProd", rateProd);
    // res.status(httpStatus.CREATED).send(review);
  }
  product = await productService.getProductId(productId);
  const totalRatings = product?.reviews?.length;
  let ratingSum = product?.reviews
    .map((review) => review.rating)
    .reduce((prev, curr) => prev + curr, 0);
  let actualProductRating = Math.round((ratingSum / totalRatings) * 10) / 10;
  console.log("-------totalRatings-----------", totalRatings);
  console.log(
    "********************************ratingSum****************",
    ratingSum
  );
  console.log(
    "-----------------actualProductRating-------------:",
    actualProductRating
  );
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      productRating: actualProductRating,
      noOfRatings: totalRatings,
    },
    { new: true }
  );

  console.log("updatedProduct", updatedProduct);
  res.status(200).send(updatedProduct);
});

// test
// exports.addReviewToProduct = catchAsync(async (req, res) => {
//   console.log("calling add review");
//   const { productId, userId, comment, ratingNo } = req.body;
//   console.log("productId", productId);

//   const product = await productService.getProductId(productId);

//   if (!product) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
//   }
//   const user = await userService.getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "user not found");
//   }

//   const alreadyReviewedByUser = await Review.findOne({
//     user: userId,
//     productId,
//   });

//   // if (alreadyReviewedByUser)
//   //   res.status(httpStatus.ALREADY_REPORTED).send(alreadyReviewedByUser);

//   // else
//   if (product && user) {
//     const review = await Review.create({
//       productId,
//       rating: ratingNo,
//       comment,
//       user: user,
//     });
//     console.log("Review", review._id);
//     const rateProd = await Product.findByIdAndUpdate(
//       productId,
//       {
//         $push: { reviews: review.id },
//       },
//       {
//         new: true,
//       }
//     ).populate("reviews");

//     const getAllRatings = await Product.findById(productId);
//     let totalRatings = getAllRatings.reviews.length;
//     // console.log("Review", review);
//     // console.log("rateProd", rateProd);

//     const avgrate = await Product.aggregate([
//       // { $match: { $expr: { $eq: [`$_id`, `$${productId}`] } } },
//       // { $match: { _id: { $eq: { $toObjectId: "638a5d7072abf4fe0a82f0a0" } } } },
//       // {
//       //   $match: {
//       //     $expr: { $eq: ["$_id", { $toObjectId: `${productId}` }] },
//       //   },
//       // },
//       { $match: { _id: mongoose.Types.ObjectId(productId) } },
//       {
//         $lookup: {
//           from: "Review",
//           localField: "reviews",
//           foreignField: "id",
//           as: "rev",
//         },
//       },
//       // { $unwind: "$rev" },
//       // {
//       //   $group: {
//       //     _id: "",
//       //     ratingAvg: {
//       //       $avg: "$rev.rating",
//       //     },
//       //   },
//       // },
//     ]);

//     console.log("avgrate", avgrate);
//     res.status(httpStatus.CREATED).send(review);
//   }
// });

exports.getAllReviewsForProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  console.log("Product Id", productId);
  //
  const allReviews = await Review.find({ productId })
    .populate("user")
    .sort("-rating");

  console.log("all reviews", allReviews);

  const ratingOccurrence = {};
  for (var i = 0; i < allReviews.length; i++) {
    var element = allReviews[i]?.rating;
    if (ratingOccurrence[element]) {
      ratingOccurrence[element] += 1;
    } else {
      ratingOccurrence[element] = 1;
    }
  }

  console.log(ratingOccurrence);

  // if (allReviews) {
  //   const ratingsArr = allReviews;
  //   console.log("all Reviews", ratingsArr);
  // }

  res.send({ allReviews, ratingOccurrence });
  //   if (allReviews) res.status(httpStatus.OK).send(allReviews);
});

exports.likeReview = catchAsync(async (req, res) => {
  console.log("req.user", req.user);

  const { reviewId } = req.body;
  const review = await Review.findById({ _id: reviewId });

  if (review) {
    var indexFound = review.like.findIndex((userId) => userId == req.user.id);
  }
  console.log("indexFound", indexFound);
  if (indexFound == -1) {
    var like = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $push: { like: req.user.id },
      },
      { new: true }
    ).exec();
    if (!like) {
      return res.status(422).json({ error: "failed to update like" });
    }
    return res.send(like);
  } else {
    res.json({ message: "user already liked the post" });
  }
});

exports.unLikeReview = catchAsync(async (req, res) => {
  console.log("req.user", req.user);
  const { reviewId } = req.body;
  const review = await Review.findById({ _id: reviewId });

  if (review) {
    var indexFound = review.unlike.findIndex((userId) => userId == req.user.id);
  }

  console.log("indexFound", indexFound);
  if (indexFound == -1) {
    var unlike = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $push: { unlike: req.user.id },
      },
      { new: true }
    ).exec();
    if (!unlike) {
      return res.status(422).json({ error: "failed to update like" });
    }
    return res.send(unlike);
  } else {
    res.json({ message: "user already un_liked the post" });
  }
});

const router = require("express").Router();
const reviewController = require("../Controllers/reviewController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");

router.post("/", authorize(), reviewController.addReviewToProduct);
router.get("/product/:productId", reviewController.getAllReviewsForProduct);
router.get("/getAllUser", authorize(), reviewController.getAllReviewForUser);
router.put("/like", authorize(), reviewController.likeReview);
router.put("/unlike", authorize(), reviewController.unLikeReview);

module.exports = router;

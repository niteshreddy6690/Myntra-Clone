const router = require("express").Router();
const reviewController = require("../Controllers/reviewController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");

router.post("/", authorize(), reviewController.addReviewToProduct);
router.get("/:productId", reviewController.getAllReviewsForProduct);
router.put("/like", authorize(), reviewController.likeReview);
router.put("/unlike", authorize(), reviewController.unLikeReview);

module.exports = router;

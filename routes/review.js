const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

// Import the controller functions directly
const { createReview, destroyReview } = require("../controllers/reviews.js");

// POST route for creating a review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(createReview) // Use the imported createReview function
);

// DELETE route for deleting a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview) // Use the imported destroyReview function
);

module.exports = router;

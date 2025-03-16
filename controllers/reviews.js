// const Review = require("../models/reviews");
// const Listing = require("../models/listing"); 

// module.exports.createReview = async(req, res) => {
   
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//         newReview.author = req.user._id;

//     listing.review.push(newReview);

//     await newReview.save();
//     await listing.save();

//     req.flash("success", "New Review Created!");
//     res.redirect(`/listings/${listing._id}`);
// };


// module.exports.destroyReview = async (req, res) => {
//     let { id, reviewId } = req.params;

   
//     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})  
//     await Review.findByIdAndDelete(reviewId);

//     req.flash("success", "Review Deleted!");
//     res.redirect(`/listings/${id}`);
// };

const Review = require("../models/reviews");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!req.body.review || !req.body.review.comment || !req.body.review.rating) {
      req.flash("error", "Review content is required!");
      return res.redirect(`/listings/${listing._id}`);
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to create review!");
    res.redirect("/listings");
  }
};


// Delete Review
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};

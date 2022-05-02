const Post = require('../models/post');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  post.reviews.push(review);
  await review.save();
  await post.save();
  req.flash('success', 'Successfully created a new comment!');
  res.redirect(`/posts/${post._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id, reviewId } = req.params;
  const post = await Post.findById(id);
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash('error', 'Cannot find that comment');
    return res.redirect('/posts');
  }
  res.render('reviews/edit', { post, review });
};

module.exports.updateReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const review = await Review.findByIdAndUpdate(reviewId, req.body.review);
  req.flash('success', 'Successfully updated comment!');
  res.redirect(`/posts/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Post.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted comment!');
  res.redirect(`/posts/${id}`);
};

const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const PostSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    description: String,
    location: String,
    createdAt: { type: Date, default: Date.now },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  opts
);

PostSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong><a href="/posts/${
    this._id
  }">${this.title.substring(0, 20)}...</a></strong>
  <p>${this.description.substring(0, 20)}...</p>
  `;
});

PostSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Post', PostSchema);

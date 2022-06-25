const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailShown: {
    type: Boolean,
    default: false,
  },
  avatar: [ImageSchema],
  firstName: String,
  lastName: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isReviewer: {
    type: Boolean,
    default: false,
  },
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

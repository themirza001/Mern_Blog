const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Please Provide user id'],
    },
    content: {
      type: String,
      required: [true, 'Please Provide Content'],
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://tse2.mm.bing.net/th?id=OIP.0U_YnQ2kbmNwDQDqYJqbowHaDQ&pid=Api&P=0&h=180',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: [true, 'Please Provide Slug'],
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

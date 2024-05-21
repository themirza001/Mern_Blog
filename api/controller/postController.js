const Post = require('../models/postModel');
const AppError = require('./../utils/AppError');

exports.createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new AppError(403, 'You Are Not allowed to create a post'));
  }

  if (!req.body.title || !req.body.content) {
    return next(new AppError(400, 'Please Provide All required Fields'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-');

  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
};

const Comment = require('./../models/commentModel');
const verifyToken = require('./../utils/verifyUser');
const AppError = require('./../utils/AppError');

exports.createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(`${content},${postId},${userId}`);
    if (userId !== req.user.id) {
      console.log('Luanched in error');
      return next(
        new AppError(403, 'You are not Allowed to create this comment')
      );
    }
    console.log('About to create new Comment');
    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
};

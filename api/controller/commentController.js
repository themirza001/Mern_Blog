const Comment = require('./../models/commentModel');
const verifyToken = require('./../utils/verifyUser');
const AppError = require('./../utils/AppError');

exports.createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(`${content},${postId},${userId}`);
    if (userId !== req.user.id) {
      return next(
        new AppError(403, 'You are not Allowed to create this comment')
      );
    }
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

exports.getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
exports.likeComment = async (req, res, next) => {
  console.log('like comment is called ');
  try {
    console.log(req.params.commentId);
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(new AppError(404, 'Comment Not Found'));
    }
    console.log(req.user.id);
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex == -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    console.log('About to save new Comment');
    await comment.save();
    console.log('saved new Comment');
    console.log(comment);
    res.status(200).json(comment);
  } catch (err) {
    console.log('Error in like comment');
    next(err);
  }
};

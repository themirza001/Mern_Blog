const express = require('express');
const router = express.Router();
const commentController = require('./../controller/commentController');

const { verifyToken } = require('./../utils/verifyUser');

router.route('/create').post(verifyToken, commentController.createComment);

router.route('/getPostComments/:postId').get(commentController.getComments);

router
  .route('/likeComment/:commentId')
  .put(verifyToken, commentController.likeComment);
router
  .route('/editComment/:commentId')
  .put(verifyToken, commentController.editComment);

router
  .route('/deleteComment/:commentId')
  .delete(verifyToken, commentController.deleteComment);

router.route('/getcomments').get(verifyToken, commentController.getComments);
module.exports = router;

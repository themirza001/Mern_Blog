const express = require('express');
const { verifyToken } = require('../utils/verifyUser');

const {
  createPost,
  getPosts,
  deletePosts,
} = require('./../controller/postController');
const router = express.Router();

const check = (req, res, next) => {
  console.log('Hello from the middlwar');
  next();
};

router.route('/create').post(verifyToken, createPost);

router.route('/getposts').get(getPosts);

router
  .route('/deletepost/:postId/:userId')
  .delete(check, verifyToken, deletePosts);

module.exports = router;

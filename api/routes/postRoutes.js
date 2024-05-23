const express = require('express');
const { verifyToken } = require('../utils/verifyUser');

const {
  createPost,
  getPosts,
  deletePosts,
  updatePosts,
} = require('./../controller/postController');
const router = express.Router();

router.route('/create').post(verifyToken, createPost);

router.route('/getposts').get(getPosts);

router.route('/deletepost/:postId/:userId').delete(verifyToken, deletePosts);

router.route('/updatepost/:postId/:userId').put(verifyToken, updatePosts);

module.exports = router;

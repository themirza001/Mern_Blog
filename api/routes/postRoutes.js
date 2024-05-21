const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createPost, getPosts } = require('./../controller/postController');
const router = express.Router();

router.route('/create').post(verifyToken, createPost);
router.route('/getposts').get(getPosts);

module.exports = router;

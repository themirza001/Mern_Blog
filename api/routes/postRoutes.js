const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createPost } = require('./../controller/postController');
const router = express.Router();

router.route('/create').post(verifyToken, createPost);

module.exports = router;

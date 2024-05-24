const express = require('express');
const router = express.Router();
const commentController = require('./../controller/commentController');
const { verifyToken } = require('./../utils/verifyUser');
router.route('/create').post(verifyToken, commentController.createComment);
module.exports = router;

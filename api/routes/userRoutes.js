const express = require('express');
const userController = require('./../controller/userController');

const router = express.Router();
const check = (req, res, next) => {
  console.log('Hello form the router');
  next();
};
router.route('/').get(userController.test);

module.exports = router;

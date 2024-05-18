const express = require('express');
const userController = require('./../controller/userController');
const { verifyToken } = require('./../utils/verifyUser');
const router = express.Router();

const check = (req, res, next) => {
  console.log('Hello form the router');
  next();
};

router.route('/').get(userController.test);

router.route('/update/:userId').put(verifyToken, userController.updateUser);
module.exports = router;

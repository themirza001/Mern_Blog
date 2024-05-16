const express = require('express');
const authContoller = require('./../controller/authController');
const router = express.Router();

router.route('/signup').post(authContoller.signup);

router.route('/signin').post(authContoller.signin);

module.exports = router;

const express = require('express');
const authContoller = require('./../controller/authController');
const router = express.Router();

router.route('/signup').post(authContoller.signup);

module.exports = router;

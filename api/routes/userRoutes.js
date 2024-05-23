const express = require('express');
const userController = require('./../controller/userController');
const { verifyToken } = require('./../utils/verifyUser');
const router = express.Router();

router.route('/update/:userId').put(verifyToken, userController.updateUser);
router.route('/delete/:userId').delete(verifyToken, userController.deleteUser);
router.route('/signout').post(userController.signout);
router.route('/getUsers').get(verifyToken, userController.getUsers);
module.exports = router;

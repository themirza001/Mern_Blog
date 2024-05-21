const User = require('../models/userModel');
const AppError = require('./../utils/AppError');
const bcrypt = require('bcryptjs');

exports.test = (req, res, next) => {
  console.log('Hello from the contoller');
  res.send('Hello form the server');
};

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(new AppError(403, 'You Are Not Allowed to Update this User'));
  if (req.body.password) {
    if (req.body.password.length < 6)
      return next(new AppError(400, 'Password Must be Atleast 6 Characters'));

    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20)
      return next(
        new AppError(400, 'Username must be between 7 and 20 characters')
      );
    if (req.body.username.includes(' ')) {
      return next(new AppError(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(new AppError(400, 'Username must be LowerCase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new AppError(400, 'username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(new AppError(403, 'You Are Not Allowed to delete this User'));
  try {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.user.id);
    res.json('user has been deleted');
  } catch (err) {
    next(err);
  }
};

exports.signout = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (err) {
    next(err);
  }
};

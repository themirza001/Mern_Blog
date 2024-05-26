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
  // if (!req.user.isAdmin && req.user.id !== req.params.userId) {
  //   return next(new AppError(403, 'You are not allowed to delete this user'));
  // }

  if (!req.user.isAdmin || req.user.id === req.params.userId) {
    return next(new AppError(403, 'You are not allowed to delete this user'));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
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

exports.getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new AppError(403, 'You Are Not allowed to see all the users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (err) {
    next(error);
  }
};

exports.getCmntUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new AppError(404, 'User Not Found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

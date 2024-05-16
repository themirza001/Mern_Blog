const AppError = require('../utils/AppError');
const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email)
    return next(new AppError(400, 'All Fields Are required'));
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: 'success',
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(new AppError(400, err.message));
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(400, 'All Fields Are Required'));
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(new AppError(404, 'User Not Found'));

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return next(new AppError(400, 'InValid Credentials'));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        status: 'success',
        message: 'Sign In SuccessFull',
        data: {
          user: rest,
        },
      });
  } catch (err) {
    next(err);
  }
};

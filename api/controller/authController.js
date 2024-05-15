const AppError = require('../utils/AppError');
const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');

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

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please Provide ur userName'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'please Provide ur email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please Provide ur password'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

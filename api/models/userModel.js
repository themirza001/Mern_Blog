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
    profilePicture: {
      type: String,
      default:
        'https://tse1.mm.bing.net/th?id=OIP.GqGVPkLpUlSo5SmeDogUdwHaHa&pid=Api&rs=1&c=1&qlt=95&w=118&h=118',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

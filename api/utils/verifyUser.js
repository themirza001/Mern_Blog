const jwt = require('jsonwebtoken');
const AppError = require('./AppError');

exports.verifyToken = async (req, res, next) => {
  console.log(req.params.id);
  console.log('i am being called');
  const token = req.cookies.access_token;
  if (!token) return next(new AppError(401, 'UnAuthorized, Access Denied'));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new AppError(401, 'UnAuthorized, Access Denied'));
    }
    req.user = user;
    next();
  });
};

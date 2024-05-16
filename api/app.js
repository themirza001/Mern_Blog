const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const AppError = require('./utils/AppError');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(404, 'Web Page Does Not Exist :)'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'Fail',
    success: false,
    message: err.message,
  });
});

module.exports = app;

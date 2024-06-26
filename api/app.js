const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoute');
const AppError = require('./utils/AppError');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
// const __dirname = path.resolve();
// const check = (req, res, next) => {
//   console.log('Hello from the middlware');
//   next();
// };

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.all('*', (req, res, next) => {
  return next(new AppError(404, 'Web Page Does Not Exist :)'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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

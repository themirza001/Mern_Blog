const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;
const path = require('path');
mongoose
  .connect('mongodb://localhost:27017/blogDataBase')
  .then(() => {
    console.log('DataBase connection is SuccessFull');
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();

app.listen(port, () => {
  console.log(`server is Listening at port ${port}`);
});

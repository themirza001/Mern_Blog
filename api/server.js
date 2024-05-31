const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose
  .connect('mongodb://localhost:27017/blogDataBase')
  .then(() => {
    console.log('DataBase connection is SuccessFull');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is Listening at port ${port}`);
});

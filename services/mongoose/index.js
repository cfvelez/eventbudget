//conexión mongo
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

//conexión con Mongo
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo`))
  .catch(err => {
    throw err;
  });

  module.exports = mongoose;
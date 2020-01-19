//conexión mongo
const mongoose = require("mongoose");
const DB_PORT = process.env.DB_PORT;

//conexión con Mongo
mongoose
  .connect(`mongodb://localhost:${DB_PORT}/eventbudget`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

  module.exports = mongoose;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, { message: "nombre de la categoria es un campo requerido." }]
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
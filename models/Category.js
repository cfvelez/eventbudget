const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  tkm_id: {
    type: String,
  },
  name: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

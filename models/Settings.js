const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = require('./Category');

const settingsSchema = new Schema({
  budget:{
          type:Double,
          require: [true, {message: "El presupuesto es un campo requerido."}]
  },
  numTickets:{
    type: Number,
    min: [1,"Cantidad miníma de tiquetes para adquirir"]
  },
  location:{
    type: Schema.Types.ObjectId,
    ref: "Cities"
  },
  categories :{
    type:[CategorySchema]
  }
});

// el string "Event" es la referencia de este modelo.
const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;

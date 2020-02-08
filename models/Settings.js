const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  budget:{
          type:Number,
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
    array:[{ type: Schema.Types.ObjectId,
      ref: "Category"}]
  }
});

// el string "Event" es la referencia de este modelo.
const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;

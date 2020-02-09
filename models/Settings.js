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
  startDate:{
    type: String
  },
  endDate:{
    type: String
  },
  location:{
    type: Schema.Types.ObjectId,
    ref: "City"
  },
  categories :{
    array:[{ type: Schema.Types.ObjectId,
      ref: "Category"}]
  }
});

class settingsClass {

   getStartDate() {
    return `${this.startDate}` + "T00:00:00" ;
  }

  getEndDate() {
    return `${this.endDate}` + "T23:59:59" ;
  }

 
}

settingsSchema.loadClass(settingsClass);

// el string "Event" es la referencia de este modelo.
const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;

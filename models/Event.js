const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: {
    type: String,
    require: [true, { message: "event Id es requerido." }]
  },
  name: {
    type: String,
    require: [true, { message: "nombre es requerido" }]
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  //el objeto createdBy es de tipo ObjectId y el atributo ref hace uso del modelo User (en este caso)
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// el string "Event" es la referencia de este modelo.
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

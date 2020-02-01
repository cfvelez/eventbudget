const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
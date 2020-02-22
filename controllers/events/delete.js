//Get API
require("dotenv").config();
const EventSchema = require("../../models/Event");
//https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa7OS.json?apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    const { Id } = req.params;

    if (Id === "")
      return res
        .status(400)
        .json({ msg: "No ha ingresado un identificador de evento." });

    const eventQuery = await EventSchema.findOneAndDelete({
      eventId: Id,
      userId: req.user._id
    });

    if (eventQuery == null) {
      res.status(200).json({ msg: "Evento no encontrado." });
    } else {
      res
        .status(200)
        .json({ msg: "Evento ha sido eliminado satisfactoriamente." });
    }
  } catch (error) {
    response.redirect("../../auth/logout");
  }
};

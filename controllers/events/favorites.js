//Get API
require("dotenv").config();
const EventSchema = require("../../models/Event");
const CategorySchema = require("../../models/Category");
const { JSONResponse } = require("../../services/http/status");
//https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa7OS.json?apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    const EventSchema = require("../../models/Event");
    const myEventsBD = await EventSchema.find({
      userId: req.user._id,
    })
      .populate("location")
      .populate("category");

    const myfavorites = myEventsBD.map((eventDB) => {
      const location =
        eventDB.location.country +
        ", " +
        eventDB.location.name +
        ", " +
        eventDB.location_place;

      const category = eventDB.category.name;

      const favorite = {
        _id: eventDB._id,
        eventId: eventDB.eventId,
        name: eventDB.name,
        image: eventDB.image,
        location: location,
        date: eventDB.date,
        time: eventDB.time,
        category: category,
      };

      return favorite;
    });

    res.status(200).json(JSONResponse("ok", "Sucess!", myfavorites));
  } catch (error) {
    res
      .status(200)
      .json(
        JSONResponse(
          "error",
          "Ha habido un problema recuperando los eventos.",
          error
        )
      );
  }
};

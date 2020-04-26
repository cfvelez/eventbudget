//Get API
require("dotenv").config();
const EventSchema = require("../../models/Event");
const CategorySchema = require("../../models/Category");
const TICKETMASTER = `${process.env.TICKETMASTER}events/`;
const API_KEY = `apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");
const { JSONResponse } = require("../../services/http/status");
//https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa7OS.json?apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    var config = {};
    const { Id } = req.params;

    let ENDPOINT = Id && Id !== "" ? TICKETMASTER + `${Id}.json` : "";

    if (ENDPOINT === "")
      return res
        .status(400)
        .json(
          JSONResponse("error", "Debe proporcionar un id de evento para añadir")
        );

    ENDPOINT = ENDPOINT + "?" + API_KEY;

    const eventSearch = await EventSchema.findOne({
      eventId: Id,
      userId: req.user._id,
    });
    if (eventSearch == null) {
      try {
        const response = await axios.get(ENDPOINT, config);
        const event = await setEvent(Id, req.user._id, response.data);

        if (event !== null)
          res
            .status(200)
            .json(JSONResponse("ok", "datos obtenidos exitosamente", event));
        else
          res
            .status(200)
            .json(
              JSONResponse("error", "Se genero un error al guardar el evento")
            );
      } catch (error) {
        console.log(error);
        res.status(200).json(JSONResponse("error", "Evento no encontrado"));
      }
    } else {
      res
        .status(200)
        .json(
          JSONResponse(
            "error",
            "El evento ya se encuentra registrado entre tus favoritos."
          )
        );
    }
  } catch (error) {
    response.redirect("../../auth/logout");
  }
};

async function setEvent(Id, userId, data) {
  const res_name = data.name;

  const res_image = data.images.reduce((s, x) => {
    if (x.ratio === "4_3") {
      s = x.url;
    }
    return s;
  }, "");

  const res_location = data._embedded.venues.map((x) => x.name).join(",");
  const res_date = data.dates.start.localDate;
  const res_time = data.dates.start.localTime;

  const res_category = data.classifications.filter((x, i) => {
    if (i === 0) return true;
  });

  const tkm_id = res_category
    .reduce((acc, s) => {
      acc.push(s.segment.id);
      return acc;
    }, [])
    .join("");

  console.log(tkm_id);
  const segment = await CategorySchema.findOne({ tkm_id });

  if (segment === null) return null;

  const event = new EventSchema({
    eventId: Id,
    name: res_name,
    image: res_image,
    location: res_location,
    date: res_date,
    time: res_time,
    category: segment._id,
    userId: userId,
  });

  const newEvent = await event.save();

  if (newEvent._id === undefined) return null;

  return newEvent;
}

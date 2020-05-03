//Get API
require("dotenv").config();
const Settings = require("../../models/Settings");
const Category = require("../../models/Category");
const TICKETMASTER = `${process.env.TICKETMASTER}events.json?`;
const API_KEY = `apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");
const { JSONResponse } = require("../../services/http/status");

//https://app.ticketmaster.com/discovery/v2/events.json?city=[Madrid]&classificationId=KZFzniwnSyZfZ7v7nJ&localStartEndDateTime=2020-02-01T23:59:59,2020-05-01T00:00:00&apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    var config = {};
    const settings = await Settings.findById(req.user.settings).populate(
      "location"
    );
    const user = req.user;
    const city = settings.location.name;
    const startDate = settings.getStartDate();
    const endDate = settings.getEndDate();
    const { page } = req.params;

    let ENDPOINT = settings ? TICKETMASTER + `city=[${city}]` : "";

    if (ENDPOINT === "")
      return res
        .status(400)
        .json(JSONResponse("error", "Debe configurar una ciudad de búsqueda."));

    /* El código comentado es porque necesitamos sacar la mayor cantidad de eventos para las pruebas y si filtramos por categoria es muy reducida, seguro por el problema del coronavirus
    const clasification = await Category.find({ tkm_id: segmentId });

    if (!clasification)
      return res
        .status(400)
        .json({ msg: "Debe ingresar una catégoria de búsqueda." });
    
    ENDPOINT = ENDPOINT + `&classificationId=${segmentId}`;
      */
    ENDPOINT = ENDPOINT + `&page=${page}`;

    ENDPOINT =
      startDate !== "" && endDate !== ""
        ? ENDPOINT + `&localStartEndDateTime=${startDate},${endDate}`
        : "";

    if (ENDPOINT === "")
      return res
        .status(400)
        .json(
          JSONResponse(
            "error",
            "Debe configurar una rango de fechas de búsquedas."
          )
        );

    ENDPOINT = ENDPOINT + "&" + API_KEY;
    let list = {};
    const response = await axios.get(ENDPOINT, config);
    const pages = response.data.page;
    const events = validateResponseData(response)
      ? response.data._embedded.events
      : [];
    if (events.length >= 1) {
      const filteredEvents = await filterEvents(events, user);
      const listEvents = filteredEvents.map((item) => {
        let clasification = item.classifications.shift().segment;

        let image = item.images
          .filter((image, index) => (index === 0 ? true : false))
          .shift();

        let datedDta = {
          localDate: item.dates.start.localDate,
          localTime: item.dates.start.localTime,
          timezone: item.dates.timezone,
        };

        let locationData = item._embedded.venues.shift();

        const objlocation = {
          name: locationData.name,
          country: locationData.country,
          city: locationData.city,
          state: locationData.state,
          address: locationData.address,
        };

        return {
          id: item.id,
          name: item.name,
          image: image.url,
          link: item.url,
          category: clasification,
          date: datedDta,
          location: objlocation,
        };
      });

      list.events = listEvents;
    } else {
      list.events = events;
    }
    list.page = pages;
    res.status(200).json(JSONResponse("ok", "Success", list));
  } catch (error) {
    console.log(error);
    res.redirect("../../auth/logout");
  }
};

function validateResponseData(response) {
  if ("_embedded" in response.data) {
    let _embeddedObj = response.data._embedded;
    if ("events" in _embeddedObj) {
      return true;
    }
  }
  return false;
}

async function filterEvents(events, user) {
  const EventSchema = require("../../models/Event");

  const myEventsBD = await EventSchema.find({ userId: user._id });

  const myEventsIds = myEventsBD.map((myEvent) => myEvent.eventId);

  return events.filter((event) => {
    return !myEventsIds.includes(event.id);
  });
}

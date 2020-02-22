//Get API
require("dotenv").config();
const Settings = require("../../models/Settings");
const Category = require("../../models/Category");
const TICKETMASTER = `${process.env.TICKETMASTER}events.json?`;
const API_KEY = `apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");
//https://app.ticketmaster.com/discovery/v2/events.json?city=[Madrid]&classificationId=KZFzniwnSyZfZ7v7nJ&localStartEndDateTime=2020-02-01T23:59:59,2020-05-01T00:00:00&apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    var config = {};
    const settings = await Settings.findById(req.user.settings).populate(
      "location"
    );
    const city = settings.location.name;
    const startDate = settings.getStartDate();
    const endDate = settings.getEndDate();
    const { segmentId } = req.params;

    let ENDPOINT = settings ? TICKETMASTER + `city=[${city}]` : "";

    if (ENDPOINT === "")
      return res
        .status(400)
        .json({ msg: "Debe configurar una ciudad de búsqueda." });

    const clasification = await Category.find({ tkm_id: segmentId });

    if (!clasification)
      return res
        .status(400)
        .json({ msg: "Debe ingresar una catégoria de búsqueda." });

    ENDPOINT = ENDPOINT + `&classificationId=${segmentId}`;

    ENDPOINT =
      startDate !== "" && endDate !== ""
        ? ENDPOINT + `&localStartEndDateTime=${startDate},${endDate}`
        : "";

    if (ENDPOINT === "")
      return res
        .status(400)
        .json({ msg: "Debe configurar un rango de fechas." });

    ENDPOINT = ENDPOINT + "&" + API_KEY;

    console.log(ENDPOINT);

    const response = await axios.get(ENDPOINT, config);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    response.redirect("../../auth/logout");
  }
};

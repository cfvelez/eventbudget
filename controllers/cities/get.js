//Get API
require("dotenv").config();
const { JSONResponse } = require("../../services/http/status");
const City = require("../../models/City");
//https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa7OS.json?apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    const cities = await City.find({ country: "Spain" }, null, {
      sort: { name: 1 },
    });
    res.status(200).json(JSONResponse("ok", "Cities ready!", cities));
  } catch (error) {
    console.log(error);
    rres.status(200).json(JSONResponse("error", error));
  }
};

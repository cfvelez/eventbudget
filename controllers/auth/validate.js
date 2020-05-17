//Get API
require("dotenv").config();
const { JSONResponse } = require("../../services/http/status");

//https://app.ticketmaster.com/discovery/v2/events.json?city=[Madrid]&classificationId=KZFzniwnSyZfZ7v7nJ&localStartEndDateTime=2020-02-01T23:59:59,2020-05-01T00:00:00&apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
  try {
    const user = req.user;

    if (user) res.status(200).json(JSONResponse("ok", "Success"));
    else return res.status(400).json(JSONResponse("error", "Token no válido."));
  } catch (error) {
    console.log(error);
    res.redirect("../../auth/logout");
  }
};

const User = require("../../models/User");
const Settings = require("../../models/Settings");
const City = require("../../models/City");
const { JSONResponse } = require("../../services/http/status");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("settings");

    const bodySettings = ({
      budget,
      numTickets,
      location,
      startDate,
      endDate,
      categories,
    } = req.body);

    if (bodySettings.budget <= 1)
      return res
        .status(200)
        .json(
          JSONResponse("error", "El presupuesto debe ser mayor a 1 euros.")
        );

    if (bodySettings.numTickets <= 0)
      return res
        .status(200)
        .json(JSONResponse("error", "Cantidad de tickets incorrecto."));

    const city = await City.findById(bodySettings.location);

    if (!city)
      return res.status(200).json(JSONResponse("error", "Ciudad no existe."));

    const settingsObj = new Settings({
      budget: bodySettings.budget,
      numTickets: bodySettings.numTickets,
      location: bodySettings.location,
      startDate: bodySettings.startDate,
      endDate: bodySettings.endDate,
      categories: bodySettings.categories,
    });

    if (user.settings) {
      //find and update
      //settings = await Settings.findById(user.settings);
      const response = await Settings.update(
        { _id: user.settings },
        bodySettings
      );

      if (response.n >= 1) {
        return res
          .status(200)
          .json(JSONResponse("ok", "Preferencias actualizadas correctamente."));
      }
    } else {
      let settings;
      settings = await settingsObj.save();
      user.settings = settings._id;

      if (await user.save()) {
        return res
          .status(200)
          .json(JSONResponse("ok", "Preferencias actualizadas correctamente."));
      }
    }

    return res
      .status(200)
      .json(JSONResponse("ok", "Error al guardar las preferencias."));
  } catch (error) {
    console.log(error);
    res.status(500).json(JSONResponse("ok", "internal server error"));
  }
};

const User = require("../../models/User");
const { JSONResponse } = require("../../services/http/status");
module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("settings");
    const settings = user.settings;
    res.status(200).json(JSONResponse("ok", "sucess!", settings));
  } catch (error) {
    res.status(500).json(JSONResponse("error", "Server error"));
  }
};

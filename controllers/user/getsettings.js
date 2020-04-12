const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("settings");
    const settings = user.settings;
    res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

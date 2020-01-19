
const User = require("../../models/User");
module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id); 

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

};

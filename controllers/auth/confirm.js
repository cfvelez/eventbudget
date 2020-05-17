const User = require("../../models/User");

module.exports = async (req, res) => {
  const { confirmationcode } = req.params;

  try {
    let result = await User.updateOne(
      { code: confirmationcode },
      { status: true }
    );

    if (result.nModified == 0)
      return res
        .status(500)
        .json({ msg: "Opps! Hubo un error. Intentelo más tarde" });

    return res.status(200).json({ msg: "Usuario activado." });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

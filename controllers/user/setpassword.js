const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { JSONResponse } = require("../../services/http/status");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const password = user.password;

    if (user.provider != "I") {
      return res
        .status(200)
        .json(
          JSONResponse(
            "error",
            "El cambio de clave no aplica para este tipo de usuarios."
          )
        );
    }

    const data = ({ currentPass, newPass, newPassConfirm } = req.body);

    if (!user)
      return res
        .status(200)
        .json(JSONResponse("error", "No se ha encontrado el usuario."));

    if (!bcrypt.compareSync(String(data.currentPass), password)) {
      return res
        .status(200)
        .json(JSONResponse("error", "Clave actual incorrecta."));
    }
    /*
    bcrypt.compare(String(data.currentPass), password, (err, result) => {
      console.log(result);
      console.log(err);
      if (result == false) {
        return res
          .status(200)
          .json(JSONResponse("error", "Clave actual incorrecta."));
      }
    });*/

    if (data.newPass.length < 5) {
      return res
        .status(200)
        .json(
          JSONResponse(
            "error",
            "La contraseña debe ser mínimo de 5 carácteres."
          )
        );
    }

    if (data.newPass != data.newPassConfirm) {
      return res
        .status(200)
        .json(
          JSONResponse(
            "error",
            "La nueva contraseña y su confirmación no coinciden."
          )
        );
    }

    user.password = bcrypt.hashSync(data.newPassConfirm, 10);

    if (await user.save()) {
      return res
        .status(200)
        .json(
          JSONResponse("ok", "La contraseña fue actualizada correctamente.")
        );
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        JSONResponse(
          "error",
          "Se ha producido un error al actualizar la contraseña"
        )
      );
  }
};

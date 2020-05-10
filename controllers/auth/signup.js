const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const uuid = require("uuid/v1");
const mail = require("../../services/nodemailer");
const { JSONResponse } = require("../../services/http/status");

module.exports = async (req, res) => {
  const { password, email, name, lastname } = req.body;

  console.log(email);

  if (password.length < 5) {
    return res
      .status(200)
      .json(JSONResponse("error", "Contraseña insegura.", null));
  }

  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(200)
        .json(JSONResponse("error", "El usuario ya existe", null));
  } catch (error) {
    return res
      .status(200)
      .json(JSONResponse("error", "Hubo un error inesperado.", null));
  }

  try {
    const hashPass = bcrypt.hashSync(password, 10);

    const confirmationCode = uuid();

    const user = new User({
      code: confirmationCode,
      password: hashPass,
      email,
      name,
      lastname,
    });

    let userDB = await user.save();

    if (!userDB)
      res
        .status(200)
        .json(
          JSONResponse(
            "error",
            "Hubo un error inesperado al crear el usuario.",
            null
          )
        );

    //se activa en entorno de producciòn
    //const response =  mail.sendConfirmSignUp(user.email, user.name + ' '+ user.lastname,confirmationCode);

    res
      .status(200)
      .json(JSONResponse("ok", "Usuario creado exitosamente!.", user));
  } catch (error) {
    res
      .status(200)
      .json(JSONResponse("error", "Hubo un error inesperado.", error));
  }
};

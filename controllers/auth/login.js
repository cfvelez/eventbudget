require("dotenv").config();
const { JSONResponse } = require("../../services/http/status");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // procedemos a autenticar la estrategia local
  passport.authenticate("local", { session: false }, (error, user, info) => {
    // Si hay un error de servidor, envíamos un 500
    if (error)
      return res.status(200).json(JSONResponse("error", "Server error"));

    // Si hay info, el error será del cliente, por lo que lo devolvemos con un 400
    if (info) return res.status(200).json(JSONResponse("error", info));

    // Procedemos a definir el payload del token.
    // en el podemos introducir la información establecer para la comunicación implicita entre el cliente y el servidor
    const payload = {
      // Declaramos la id de usuario, para poder acceder a ella más tarde(En el punto 4)
      sub: user._id,
      // Definimos el tiempo de expiración
      // !NOTA: Transformamos la variable de entorno a número para poder operar con date.now
      exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
      //Enviamos información útil adicional
      username: user.email,
    };

    // Haciendo uso de la librería jsonwentoken generamos el token:
    // como primer parametro recibe el payload en formato string (por lo que hay que "stringifycarlo")
    // como segundo parámetro, recibe el SECRET también en formato de string. Lo recogemos del archivo .env
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    console.log("auth", token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(200).json(JSONResponse("error", err));
        }
      });
    }

    //Devolvemos el token al usuario
    return res.status(200).json(JSONResponse("ok", "Success", token));
    // Ejecutamos la función pasandole los parametros req y res
  })(req, res);
};

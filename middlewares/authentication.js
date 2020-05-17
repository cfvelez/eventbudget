const passport = require("passport");
const { JSONResponse } = require("../services/http/status");

module.exports = {
  // 5. Definimos el middlewere que ire en la ruta a autenticar
  isAuthenticated: (req, res, next) => {
    // definimos el método de autenticación como jwt, la sesión a false y el callback para gestionar la información de la estrategia jwt
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      console.log(
        `Autenticación de estrategia jwt. Información recibida: error: ${error}, user: ${user.email}, info: ${info}`
      );

      // comprobamos si hay error interno
      if (error)
        return res.status(200).json(JSONResponse("error", "Hubo un error"));

      // Comprobamos si está autorizado
      if (info) return res.status(200).json(JSONResponse("error", `${info}`));

      // Comprobamos si está autorizado
      if (!user)
        return res.status(200).json(JSONResponse("error", "No autorizado"));

      // Iniciamos el usuario en el objeto req para poder acceder en la función handler o principal
      req.user = user;
      // Finalizamos el middleware y pasamos a función principal (o a siguiente middleware en caso de haberlo)
      next();

      //Ejecutamos la función con req, res, next como parametros
    })(req, res, next); //no entiendo esto
  },
};

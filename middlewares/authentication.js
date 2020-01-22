const passport = require("passport");

module.exports = {
  // 5. Definimos el middlewere que ire en la ruta a autenticar
  isAuthenticated: (req, res, next) => {
  
    passport.authenticate("local",{session:true}, (error, user, info) => {
      console.log(
        `Middleware Autenticación de estrategia local. Información recibida: error: ${error}, user: ${user.email}, info: ${info}`
      );

      console.log(req.isAuthenticated());

      console.log(info);
      
      // comprobamos si hay error interno
      if (error) return res.status(500).json({ message: "Hubo un error" });

      // Comprobamos si está autorizado
      if (!user) return res.status(401).json({ message: "No autorizado" });

      // Iniciamos el usuario en el objeto req para poder acceder en la función handler o principal
      req.user = user;
      // Finalizamos el middleware y pasamos a función principal (o a siguiente middleware en caso de haberlo)
      next();

      //Ejecutamos la función con req, res, next como parametros
    });//no entiendo esto
  }
};

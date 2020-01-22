require("dotenv").config();
const passport = require("passport");

module.exports = async (req, res,next) => {
  // procedemos a autenticar la estrategia local
  passport.authenticate("local",{session:true}, (error, user, info) => {
    console.log(
      `Autenticación de estrategia local. Información recibida: error: ${error}, user: ${user}, info: ${info}`
    );

    // Si hay un error de servidor, envíamos un 500
    if (error) res.status(500).json({ message: "Hubo un error" });

    // Si hay info, el error será del cliente, por lo que lo devolvemos con un 400
    
    if (info) res.status(400).json(info);
      
    req.user = user;

    res.status(200).json({ msg:"Usuario Logueado." });
    // Ejecutamos la función pasandole los parametros req y res
  })(req, res,next); // esto como funciona??
};

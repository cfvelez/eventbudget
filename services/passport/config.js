const passport = require("passport");
const session = require("express-session");


module.exports = async app => {
 
  app.use(
    session({
      secret: "even-budget",
      resave: false,
      saveUninitialized: false
    })
    );
  
  app.use(passport.initialize());

  app.use(passport.session());
  passport.use(require("./strategies/local"));

  // 1.2. DEFINIMOS LA ESTRATEGIA LOCAL.
  /* Esta estrategia servirá para establecer el login. 
  En ella comprobaremos que los datos de usuario son correctos (en este caso que exista y que la 
  contraseña sea validad) */
  
  // requires the model with Passport-Local Mongoose plugged in
  const User = require('../../models/User');
  //passport.use(await User.authenticate());

  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(await User.serializeUser());
  passport.deserializeUser(await User.deserializeUser());

  /*
  passport.serializeUser((user, callback) => {
    console.log("SERIALIZADOR");
    callback(null, user);
  });
  
  passport.deserializeUser(async (id, callback) => {
    console.log("DESERIALIZADOR");
  
    try {
      const user = await User.findById(id);
  
      if (!user) return callback({ message: "El usuario no existe" });
  
      return callback(null, user);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  });
  */
  //passport.use(require("./strategies/jwt"));

  //Estrategia de facebook
  //passport.use(require("./strategies/facebook"));

  

  // 1.5. Tras esto, podemos proceder a autenticar las rutas (ir a ./routes/index)
};

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
  

  // 1.2. DEFINIMOS LA ESTRATEGIA LOCAL.
  /* Esta estrategia servirá para establecer el login. 
  En ella comprobaremos que los datos de usuario son correctos (en este caso que exista y que la 
  contraseña sea validad) */
 
  require("./strategies/local")(passport);
  
  //passport.use(require("./strategies/jwt"));

  //Estrategia de facebook
  passport.use(require("./strategies/facebook"));

  

  // 1.5. Tras esto, podemos proceder a autenticar las rutas (ir a ./routes/index)
};

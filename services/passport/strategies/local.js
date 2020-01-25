// importamos la estrategia local
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../../models/User");

const opt = {
  // Los campos usernameField y passwordField, servirán para definir
  // el nombre de los atributos por los que encontraremos y comprobaremos al usuario
  usernameField: "email",
  passwordField: "password"
};

// La estrategía local recibe un primer parametro de configuración y un callback de verificación como segundo parametro

module.exports = (passport)=>{ 
          
          //Serializador
          console.log("SERIALIZADOR");
          passport.serializeUser((user, done) => {
            console.log("SERIALIZADOR");
            done(null, user._id);
          });
          
          //Deserializador
          console.log("DESERIALIZADOR");
          passport.deserializeUser(async (id, done) => {
            console.log("DESERIALIZADOR");
          
            try {
              const user = await User.findById(id);
          
              if (!user) return done({ message: "El usuario no existe" });
          
              return done(null, user);
            } catch (error) {
              console.log(error);
              return done(error);
            }
          });

          //Implementación estrategia local para Login
          passport.use(new LocalStrategy(
          opt,
          async (email, password, next) => {
            console.log(
              `Estrategia local. Información recibida: email ${email}, password${password}`
            );

            try {
            
              const user = await User.findOne({ email });

              /*Si no hay usuario enviamos ejecutamos next con el primer parametro (error) a null, el segundo parametro 
            (data, en este caso usuario) a false y el tercer parametro (info) con el mensaje de error*/
              if (!user) next(null, false, { message: "El usuario no existe" });

              // comprobamos la contraseña y procedemos igual que si no hay usuario
              if (!user.comparePassword(password, user.password))
                next(null, false, { message: "la contraseña no es correcta" });
        
              // Si el usuario existe y la contraseña es correcta, lo enviamos como segundo parametro de la función next.
              next(null, user,null);
            } catch (error) {
              //Si hay un error, lo envíamos como primer parametro de la función next.
              next(error);
            }
          }));
        }

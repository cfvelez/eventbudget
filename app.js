
//cargamos las variables del entorno
require("dotenv").config();
const app = require("./conf/");
require("./services/mongoose");
var indexRouter = require("./routes/index");

//Iniciamos la configuración de passport
require("./services/passport/config")(app);
//importamos las rutas requeridas

app.use("/", indexRouter);

//gestionamos las rutas no configuradas
app.use((request, response) => {
  response.status(404).json({msg:"Ruta no encontrada."});
});

module.exports = app;


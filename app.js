
//cargamos las variables del entorno
require("dotenv").config();
const app = require("./conf/");
const mongoose = require("./services/mongoose");
var indexRouter = require("./routes/index");

//Iniciamos la configuración de passport
require("./services/passport/config")(app);
//importamos las rutas requeridas

app.use("/", indexRouter);

//gestionamos las rutas no configuradas
app.use((request, response) => {
  response.status(404).json({msg:"Ruta no encontrada."});
});

//Iniciamos el servidor
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT} `);
});

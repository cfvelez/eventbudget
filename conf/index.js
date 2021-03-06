//cargamos la libreria de express
const Express = require("express");
//creamos el objeto app
const app = Express();
//Configuramos el body-parser
const bodyParser = require("body-parser");

//configuramos el bodyParser en la aplicación para capturar el body de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuramos los directorios estáticos
app.use(Express.static(__dirname + "/public"));

module.exports = app;


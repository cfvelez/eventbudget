require("dotenv").config();

const Express = require("express");
const app = Express();


const bodyParser = require("body-parser");
const SERVER_PORT = process.env.SERVER_PORT || 5000;

//conexión mongo
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const DB_PORT = process.env.DB_PORT;

//Handle para las vistas
var exphbs  = require('express-handlebars');

//conexión con Mongo
mongoose
  .connect(`mongodb://localhost:${DB_PORT}/eventbudget`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

//configuramos el manejo de sesiones

app.use(
  session({
    secret: "auth",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//configuramos el bodyParser en la aplicación para capturar el body de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Configuramos los directorios estáticos
app.use(Express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars")


//importamos las rutas requeridas
app.use("/", require("./routes/index.js"));
app.use("/auth", require("./routes/auth/index.js"));
//app.use("/spotify", require("./routes/spotify/index.js"));

//gestionamos las rutas no configuradas
app.use((request, response) => {
  //response.render("home");
  response.render("notFound");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});

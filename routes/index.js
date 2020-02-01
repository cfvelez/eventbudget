//Importamos express
const express = require("express");
//Importamos el servicio de routing
const router = express.Router();
//configuramos middleware para gestionar la seguridad
//const { isAuthenticated } = require("../middlewares/authentication");

//rutas relacionadas con la autenticación
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/events", require("./events"));
module.exports = router;

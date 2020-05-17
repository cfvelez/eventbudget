const { JSONResponse } = require("../services/http/status");

module.exports = (req, res, next) => {
  user = req.user;

  if (user) {
    if (user.status === true) return next();
  }

  res.status(200).json(JSONResponse("error", "El usuario no está activo"));
};

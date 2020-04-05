const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");

const city = require("../../controllers/cities/");

router.get("/", [isAuthenticated, isUserActive], city.get);
module.exports = router;

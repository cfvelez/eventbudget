const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");

const event = require("../../controllers/events/");

router.get("/:page", [isAuthenticated, isUserActive], event.all);
module.exports = router;

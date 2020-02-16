const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");

const event = require("../../controllers/events/");

router.get("/:Id",[isAuthenticated, isUserActive], event.get);
module.exports = router;
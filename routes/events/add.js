const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");

const event = require("../../controllers/events/");

router.post("/:Id", [isAuthenticated, isUserActive], event.add);
module.exports = router;

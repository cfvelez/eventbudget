const express = require("express");
const router = express.Router();
const events = require("../../controllers/events");
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");

router.get("/" ,[isAuthenticated, isUserActive],events.all);



module.exports = router;

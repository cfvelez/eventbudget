const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const auth = require("../../controllers/auth");

router.post("/", [isAuthenticated, isUserActive], auth.validate);
module.exports = router;

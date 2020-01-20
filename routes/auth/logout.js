const Express = require("express");
const router = Express.Router();
const auth = require("../../controllers/auth");
const {isAuthenticated} = require('../../middlewares/authentication');
const isUserActive = require("../../middlewares/isUserActive");

// LogOut
router.get("/",[isAuthenticated, isUserActive], auth.logout);

module.exports = router;
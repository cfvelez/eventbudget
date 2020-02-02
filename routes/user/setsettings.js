const Express = require("express");
const router = Express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const settings = require("../../controllers/user/");

router.post("/",[isAuthenticated, isUserActive],settings.set);

module.exports = router;
const Express = require("express");
const router = Express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const settings = require("../../controllers/user");

router.get("/",[isAuthenticated, isUserActive],settings.get);

module.exports = router;
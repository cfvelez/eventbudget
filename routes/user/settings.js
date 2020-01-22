const Express = require("express");
const router = Express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const {settings} = require("../../controllers/user");

router.get("/",[isUserActive],settings.getProfile);

module.exports = router;
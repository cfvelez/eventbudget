const Express = require("express");
const router = Express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");

const {settings} = require("../../controllers/user");

router.get("/",isAuthenticated,settings.getProfile);

module.exports = router;
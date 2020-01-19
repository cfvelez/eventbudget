const Express = require("express");
const router = Express.Router();
const auth = require("../../controllers/auth");
const {isAuthenticated} = require('../../middlewares/authentication');
// LogOut
router.get("/",isAuthenticated, auth.logout);

module.exports = router;
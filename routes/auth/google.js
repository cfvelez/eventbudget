const Express = require("express");
const router = Express.Router();
const passport = require('passport');
const auth = require("../../controllers/auth");


router.get('/', passport.authenticate('google',{ scope: ['profile','email'] }));

router.get('/callback',auth.google );

module.exports = router;


const Express = require("express");
const router = Express.Router();
const passport = require('passport');
const auth = require("../../controllers/auth");


router.get('/', passport.authenticate('facebook',{ scope: ['profile'] }));

router.get('/callback',auth.facebok );

module.exports = router;

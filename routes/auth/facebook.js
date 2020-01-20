
const Express = require("express");
const router = Express.Router();
const passport = require('passport');


router.get('/', passport.authenticate('facebook'));

router.get('/callback/', passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/auth/login' }));

module.exports = router;

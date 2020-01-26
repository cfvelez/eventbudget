
const Express = require("express");
const router = Express.Router();
const passport = require('passport');
const auth = require("../../controllers/auth");


router.get('/', passport.authenticate('facebook'));

router.get('/callback',passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
function(req, res) {
  res.redirect('/logout');
});

module.exports = router;

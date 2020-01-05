
const Express = require("express");
const bcrypt = require("bcryptjs")

const router = Express.Router();



router.get("/", async (req, res) => {

    req.session.destroy();

    res.redirect('../../home');
})


module.exports = router
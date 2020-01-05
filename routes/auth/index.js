const Express = require("express");
const router = Express.Router();

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));

module.exports = router;
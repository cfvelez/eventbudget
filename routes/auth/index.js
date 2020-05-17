const Express = require("express");
const router = Express.Router();

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/userconfirmation", require("./confirm"));
router.use("/logout", require("./logout"));
router.use("/facebook", require("./facebook"));
router.use("/google", require("./google"));
router.use("/validate", require("./validate"));

module.exports = router;

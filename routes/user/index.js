const Express = require("express");
const router = Express.Router();

router.use("/settings", require("./getsettings"));
router.use("/settings", require("./setsettings"));
router.use("/password", require("./setpassword"));

module.exports = router;

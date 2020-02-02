const Express = require("express");
const router = Express.Router();

router.use("/settings", require("./getsettings"));




module.exports = router;
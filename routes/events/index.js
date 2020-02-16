const Express = require("express");
const router = Express.Router();

router.use("/all", require("./all"));
router.use("/get", require("./get"));

module.exports = router;
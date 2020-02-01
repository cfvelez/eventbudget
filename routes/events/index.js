const Express = require("express");
const router = Express.Router();

router.use("/all", require("./all"));

module.exports = router;
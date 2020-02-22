const Express = require("express");
const router = Express.Router();

router.use("/all", require("./all"));
router.use("/get", require("./get"));
router.use("/add", require("./add"));
router.use("/del", require("./delete"));

module.exports = router;

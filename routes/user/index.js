const Express = require("express");
const router = Express.Router();

router.use("/settings", require("./settings"));




module.exports = router;
const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth");

router.get("/:confirmationcode", auth.confirm);
module.exports = router;

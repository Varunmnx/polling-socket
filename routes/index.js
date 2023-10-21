const express = require("express");
const router = express.Router();

router.get("/*", (req, res, next) => {
  return res.render("pages/error.ejs");
});
module.exports = router;

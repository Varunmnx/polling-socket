const express = require("express");
const router = express.Router();
const { COOKIE_NAMES } = require("../utils/static.util");
const { POLLDATA } = require("../utils/constants.js");
const { handleLogin } = require("../controllers/user.controller");
//login api
router.post("/login", handleLogin);
//logout api
router.get("/logout", (req, res, next) => {
  console.log("logging out");
  res.setHeader("Clear-Site-Data", '"cookies", "storage"');
  return res.status(201).json({ message: "user logged out" });
});

router.get("/getPolls", (req, res) => {
  console.log("polls");
  res.status(201).json({ pollData: POLLDATA });
});

module.exports = router;

const jwt = require("jsonwebtoken");
const config = process.env;
const { COOKIE_NAMES } = require("../utils/static.util");
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.cookie("isAuthenticated", false).redirect("/login");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("%cauth.js line:13 decoded", "color: #007acc;", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.cookie(COOKIE_NAMES.ISAUTHENTICATED, false).redirect("/login");
  }
};

exports.verfiyUnAuthenticated = (req, res, next) => {
  try {
    console.log(req.cookies.isAuthenticated);
    if (req.cookies.isAuthenticated && req.cookies.token) {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    next();
    console.log(error);
  }
};

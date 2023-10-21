const { USERDATA } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { COOKIE_NAMES } = require("../utils/static.util");
exports.handleLogin = (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const currentUser = USERDATA.find(
      (user) => user.userName === username && user.password === password,
    );
    if (currentUser) {
      const token = jwt.sign(currentUser, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.cookie(COOKIE_NAMES.TOKEN, token, { maxAge: 86400000 });
      res.cookie(COOKIE_NAMES.ISAUTHENTICATED, true);
      return res
        .status(200)
        .json({ message: "success", token, user: currentUser.userName });
    }
    return res.status(404).json({ message: "user not found" });
  } catch (err) {
    return res.status(501).json({ message: "server error", err: err.message });
  }
};

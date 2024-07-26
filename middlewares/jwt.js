const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.json({
      status: "Failed",
      message: "Access denied",
    });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;

      next();
    } catch (error) {
      res.json({
        status: "Failed",
        message: "Invalid authorization code passed",
        error: error.message,
      });
    }
  }
};

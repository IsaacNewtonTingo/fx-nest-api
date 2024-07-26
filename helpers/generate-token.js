const jwt = require("jsonwebtoken");

async function generateToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  return token;
}
module.exports = {
  generateToken,
};

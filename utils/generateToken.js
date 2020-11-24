const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

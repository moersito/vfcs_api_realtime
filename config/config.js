// config.js
const strings = require("../utils/strings");

module.exports = {
  // secret: 'supersecret'
  jwtSecretKey: strings.access.token,
};
const jwt = require('jsonwebtoken');
const fs = require('file-system');
const constants = require('./constants');

const getExpiration = () => {
  const now = new Date();
  return new Date(now.getTime() + constants.TOKEN_EXPIRATION_TIME * 1000);
};

const generateToken = (id) => {
  const privateKey = fs.readFileSync('./.private.key', 'utf8');
  const token = jwt.sign({ id }, privateKey, {
    expiresIn: constants.TOKEN_EXPIRATION_TIME,
    algorithm: constants.TOKEN_ALGORITHM,
  });

  return `Bearer ${token}`;
};

module.exports = {
  getExpiration,
  generateToken,
};

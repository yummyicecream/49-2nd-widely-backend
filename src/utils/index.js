const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY);
};

/**
 * throwError
 * @param {number} code : error code
 * @param {string} message : error message
 * @returns
 */
const throwError = (code, message) => {
  const error = new Error(message);
  error.status = code;
  return error;
};

module.exports = { generateToken, throwError };

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
  throw error;
};

const asyncWrap = (asyncController) => {
  return async (req, res, next) => {
    try {
      await asyncController(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { generateToken, throwError, asyncWrap };

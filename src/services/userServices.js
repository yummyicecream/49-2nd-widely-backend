const bcrypt = require('bcrypt');
const { throwError } = require('../utils');
const { userDao } = require('../models');
const { emailDuplicateCheck, createUserAndPoint, findUserEmail } = userDao;

const isEmailUnique = async (email) => {
  return await emailDuplicateCheck(email);
};

const registerUser = async (email, password, name, address1, address2, address3, phonenumber, birthday, terms) => {
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const newPoint = 30000;

    return await createUserAndPoint(
      email,
      passwordHash,
      name,
      newPoint,
      address1,
      address2,
      address3,
      phonenumber,
      birthday,
      terms,
    );
  } catch (err) {
    console.error(err);
    throwError(400, 'Failed to register user');
  }
};

const userPasswordCheck = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const findUserId = async (req) => {
  return await findUserEmail(req);
};

module.exports = { isEmailUnique, registerUser, userPasswordCheck, findUserId };

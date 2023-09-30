const bcrypt = require('bcrypt');
const { userDao } = require('../models');
const { emailDuplicateCheck, createUserAndPoint } = userDao;

const isEmailUnique = async (email) => {
  return await emailDuplicateCheck(email);
};

const registerUser = async (email, password, name, address1, address2, address3, phonenumber, birthday, terms) => {
  const passwordHash = await bcrypt.hash(password, 12);
  const newPoint = 20000;

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
};

module.exports = { isEmailUnique, registerUser };

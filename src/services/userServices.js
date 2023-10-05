const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { throwError } = require('../utils');
const { userDao } = require('../models');
const { emailDuplicateCheck, createUserAndPoint, findUserEmail, findUserNameEmail, userUpdatePassword } = userDao;

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

const findUserPassword = async (req) => {
  const userCheck = await findUserNameEmail(req);

  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!%^&*_+?';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }

    return randomString;
  };

  const resetPassword = generateRandomString(11);
  const passwordHash = await bcrypt.hash(resetPassword, 12);
  await userUpdatePassword(userCheck.email, passwordHash);

  if (userCheck != 0) {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_ID,
        pass: process.env.MAILER_PW,
      },
    });
    const message = {
      from: process.env.MAILER_ID,
      // to: `${req.email}`,
      to: process.env.MAILER_ID,
      subject: 'widely에서 임시비밀번호를 알려드립니다.',
      html: `임시비밀번호: <strong>${resetPassword}</strong>`,
    };
    return transport.sendMail(message, (err) => {
      if (err) {
        console.error(err);
        throwError(400, 'error message');
      }
    });
  }
};

module.exports = {
  isEmailUnique,
  registerUser,
  userPasswordCheck,
  findUserId,
  findUserPassword,
};

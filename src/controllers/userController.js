const { throwError, generateToken } = require('../utils');
const { userServices } = require('../services');
const { isEmailUnique, registerUser, userPasswordCheck, findUserId, findUserPassword } = userServices;

const signup = async (req, res, next) => {
  try {
    const { email, password, name, address1, address2, address3, phonenumber, birthday, terms } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !address1 ||
      !address2 ||
      !address3 ||
      !phonenumber ||
      !birthday ||
      (terms !== 0 && terms !== 1)
    ) {
      throwError(400, 'Key error');
    }

    // 이메일 형식 체크
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) throwError(400, 'Invalid email address');

    // 비밀번호 11자 이상 16자 이내 체크
    if (password.length < 10 && password.length < 17) throwError(400, 'Invalid password');

    // 비밀번호 특수문자 유무 체크
    const specialChar = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (!specialChar.test(password)) {
      throwError(400, 'Invalid password');
    }

    // 중복된 이메일 체크
    const emailCheck = await isEmailUnique(email);
    if (emailCheck.length != 0) {
      throwError(400, 'Duplicate email address');
    }

    // 유저 회원가입
    await registerUser(email, password, name, address1, address2, address3, phonenumber, birthday, terms);

    return res.status(201).json({
      message: 'Registration success',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 키에러 체크
    if (!email || !password) throwError(403, 'Key error');

    // 이메일 체크
    const [emailCheck] = await isEmailUnique(email);
    if (!emailCheck) throwError(401, 'Not found email');

    // 비밀번호 체크
    const userPassword = emailCheck.password;
    const passwordCheck = await userPasswordCheck(password, userPassword);

    if (passwordCheck) {
      // 토큰 생성
      const token = generateToken(emailCheck.id);
      if (!token) throwError(401, 'Token generation failure');

      res.setHeader('Authorization', `Bearer ${token}`);
      return res.status(200).json({
        message: 'Login success',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const findId = async (req, res, next) => {
  try {
    return res.status(200).json({
      userId: `${await findUserId(req.body)}`,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const findPassword = async (req, res, next) => {
  try {
    await findUserPassword(req.body);
    return res.status(200).json({
      message: '',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { signup, login, logout, findId, findPassword };

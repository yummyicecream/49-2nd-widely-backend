const { throwError } = require('../utils');
const { userServices } = require('../services');
const { isEmailUnique, registerUser } = userServices;

const signup = async (req, res, next) => {
  try {
    const { email, password, name, address1, address2, address3, phonenumber, birthday, terms } = req.body;

    // 키에러 체크
    if (!email || !password || !name || !address1 || !address2 || !address3 || !phonenumber || !birthday || !terms) {
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
    if (emailCheck) {
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

module.exports = { signup };

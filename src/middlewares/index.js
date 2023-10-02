const jwt = require("jsonwebtoken")
const { throwError } = require('../utils')

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    //토큰이 없다면 에러 발생
    if (!accessToken) {
      throwError(401, 'AccessToken required');
    }

    const { id } = jwt.verify(accessToken, process.env.SECRET_KEY);
  
    // 사용자 id를 req.loginUser에 저장
    req.loginUser = { id };
    next();
    
  } catch (error) {
    console.log(error);
    error.status = error.status || 400;
    next(error);
  }
};


module.exports = { validateToken };
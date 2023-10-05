const { AppDataSource } = require('./data-source');

const emailDuplicateCheck = async (email) => {
  const emailCheck = await AppDataSource.query(
    `
  SELECT id, email, password
  FROM users
  WHERE email = ?;`,
    [email],
  );
  return emailCheck;
};

const createUserAndPoint = async (
  email,
  password,
  name,
  newPoint,
  address1,
  address2,
  address3,
  phonenumber,
  birthday,
  terms,
) => {
  const createUserRecord = await AppDataSource.query(
    `
    INSERT INTO users(email, password, name, zipcode, address1, address2, phone_number, birthday, terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [email, password, name, address1, address2, address3, phonenumber, birthday, terms],
  );

  const [lastInsertIdResult] = await AppDataSource.query(`SELECT LAST_INSERT_ID() as id`);
  let lastInsertId = lastInsertIdResult.id;

  // 신규유저 포인트 생성
  const userSignUpPoint = await AppDataSource.query(
    `
    INSERT INTO points (point, user_id) VALUES (?, ?)`,
    [newPoint, lastInsertId],
  );

  return userSignUpPoint;
};

const findUserEmail = async ({ name, phonenumber }) => {
  const [findEmail] = await AppDataSource.query(
    `
    SELECT name, email, phone_number FROM users WHERE name = ? AND phone_number = ?`,
    [name, phonenumber],
  );
  return findEmail.email;
};

const findUserNameEmail = async ({ name, email }) => {
  const [findNameEmail] = await AppDataSource.query(
    `
    SELECT name, password, email FROM users WHERE name = ? AND email = ?`,
    [name, email],
  );
  return findNameEmail;
};

const userUpdatePassword = async (email, password) => {
  const updatePassword = await AppDataSource.query(
    `
  UPDATE users SET password = ? WHERE email = ?`,
    [password, email],
  );
  return updatePassword;
};

module.exports = { emailDuplicateCheck, createUserAndPoint, findUserEmail, findUserNameEmail, userUpdatePassword };

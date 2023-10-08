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
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const insertUserId = await queryRunner.query(
      `
      INSERT INTO users(email, password, name, zipcode, address1, address2, phone_number, birthday, terms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, password, name, address1, address2, address3, phonenumber, birthday, terms],
    );
    const insertPointId = await queryRunner.query(
      `
      INSERT INTO points (point, user_id)
      VALUES (?, ?)`,
      [newPoint, insertUserId.insertId],
    );
    await queryRunner.query(
      `
      UPDATE users
      SET user_point = ?
      WHERE id = ?`,
      [insertPointId.insertId, insertUserId.insertId],
    );
    await queryRunner.commitTransaction();
    return 'Transaction completed';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'Transaction failed');
  } finally {
    await queryRunner.release();
  }
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

const { AppDataSource } = require('./data-source');

const emailDuplicateCheck = async (email) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email = ?;`,
      [email],
    );
    return result;
  } catch (err) {
    console.error(err);
    throwError(500, 'Checking email duplication');
  }
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
  try {
    const [result] = await AppDataSource.query(
      `
      SELECT name, email, phone_number FROM users WHERE name = ? AND phone_number = ?`,
      [name, phonenumber],
    );

    if (result !== undefined) {
      return result.email;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throwError(500, 'Error while finding user email');
  }
};

const findUserNameEmail = async ({ name, email }) => {
  try {
    const [result] = await AppDataSource.query(
      `
      SELECT name, password, email FROM users WHERE name = ? AND email = ?`,
      [name, email],
    );

    if (result !== undefined) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throwError(500, 'Error while finding user email');
  }
};

const userUpdatePassword = async (email, password) => {
  try {
    const result = await AppDataSource.query(
      `
    UPDATE users SET password = ? WHERE email = ?`,
      [password, email],
    );

    if (result.affectedRow > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    throwError(500, 'Error while updating user password');
  }
};

module.exports = { emailDuplicateCheck, createUserAndPoint, findUserEmail, findUserNameEmail, userUpdatePassword };

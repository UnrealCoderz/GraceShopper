// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById,
  getUser,
  getUserByEmail,
  getUserByUsername,
};

async function createUser({ email, username, password }, isAdmin = false) {
  console.log(username)
  const {
    rows: [user],
  } = await client.query(
    `INSERT INTO users(email, username, password, isAdmin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
      `,
    [email, username, password, isAdmin]
  );
  delete user.password;
  return user;
}

async function getAllUsers() {
  const { rows } = await client.query(
    `
  SELECT * 
  FROM users
`
  );
  return rows;
}

async function getUser({ email, password }) {
  const { rows: user } = await client.query(
    `
  SELECT * 
  FROM users
  WHERE email=$1`,
    [email]
  );

  if (user[0].password === password) {
    delete user[0].password;
    return user[0];
  }
}

async function getUserById(userId) {
  try {
    const { rows: user } = await client.query(
      `SELECT * 
    FROM users
    WHERE id=${userId}`
    );
    if (!user) {
      return null;
    }
    delete user[0].password;

    return user[0];
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { rows: user } = await client.query(
      `SELECT *
    FROM users
    WHERE username=$1`,
      [userName]
    );

    return user[0];
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { rows: user } = await client.query(
      `SELECT *
    FROM users
    WHERE email=$1`,
      [email]
    );

    return user[0];
  } catch (error) {
    throw error;
  }
}

async function createFufilledOrders(BuyerId, SellerId) {
  try {
    const { rows: Order } = await client.query(
      `
      INSERT INTO orders("buyerId", "sellerId")
      VALUES($1, $2)
      RETURNING *

      `,
      [BuyerId, SellerId]
    );

    return Order;
  } catch (error) {
    throw error;
  }
}

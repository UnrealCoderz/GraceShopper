const client = require("../client");

module.exports = {
  getCartById,
  getCartByUser,
};

async function getCartById(cartId) {
  try {
    const { rows: cart } = await client.query(
      `SELECT * 
      FROM carts
      WHERE id=${cartId}`
    );

    return cart[0];
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId) {
  try {
    const { rows: cart } = await client.query(
      `SELECT * FROM carts
            WHERE "usersid"= $1`,
      [userId]
    );
    return cart[0];
  } catch (error) {
    throw error;
  }
}

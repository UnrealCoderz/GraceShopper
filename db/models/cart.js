const client = require("../client");

module.exports = {
  getCartByUserId,
  createNewCart
};

async function createNewCart(userId, status) {
  try {
    const { rows: [newCart] } = await client.query(`
    INSERT INTO carts ("usersid", status)
    VALUES ($1, $2)
    RETURNING *;
    `, [userId, status]);
    return newCart;
  }
  catch (error) {
    throw error;
  }
}

// async function getCartById(cartId) {
//   try {
//     const { rows: cart } = await client.query(
//       `SELECT * 
//       FROM carts
//       WHERE id=${cartId}`
//     );

//     return cart[0];
//   } catch (error) {
//     throw error;
//   }
// }

async function getCartByUserId(userId) {
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

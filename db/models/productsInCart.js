const client = require("../client");

module.exports = {
  addProductToCart,
  getProductsInCartById,
  deleteProductsInCart,
  updateProductsInCart,
  getProductsInCartByCartId,
};

async function addProductToCart({ productId, cartId, quantity }) {
  try {
    const { rows: Products } = await client.query(
      `
    INSERT INTO products_in_cart("productsid", "cartsid", quantity)
    VALUES($1, $2, $3)
    RETURNING *;
    `,
      [productId, cartId, quantity]
    );
    return Products;
  } catch (error) {
    throw error;
  }
}

async function getProductsInCartById(id) {
  try {
    const { rows: Product } = await client.query(`
        SELECT * 
        FROM products_in_cart 
        WHERE id=${id}`);
    return Product[0];
  } catch (error) {
    throw error;
  }
}

async function getProductsInCartByCartId(cartsid) {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products_in_cart
      WHERE "cartsid"=${cartsid};
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function updateProductsInCart({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length > 0) {
    const { rows: Product } = await client.query(
      `
  UPDATE products_in_cart
  SET ${setString}
  WHERE id=$${Object.values(fields).length + 1}
  RETURNING *;`,
      [...Object.values(fields), id]
    );

    return Product[0];
  }
}

async function deleteProductsInCart(id) {
  try {
    const { rows } = await client.query(
      `DELETE FROM products_in_cart
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    const [Product] = rows;
    return Product;
  } catch (error) {
    console.error(error);
  }
}

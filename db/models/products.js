// grab our db client connection to use with our adapters
const client = require("../client");

async function createNewProduct({
  sellerId,
  name,
  description,
  image,
  price,
  active
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products ("sellerId", name, description, image, price, active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [sellerId, name, description, image, price, active]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      [...Object.values(fields)]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllProductsBySellerId(sellerId) {
  try {
    const { rows: productIds } = await client.query(
      `
            SELECT id 
            FROM products
            WHERE "sellerId"=$1;
        `,
      [sellerId]
    );

    const products = await Promise.all(
      productIds.map((product) => getProductById(product.id))
    );
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const { rows } = await client.query(`
            SELECT * FROM products
            WHERE id=${productId};
        `);
    if (rows.length === 0) {
      return null;
    } else {
      return rows[0];
    }
  } catch (error) {
    throw error;
  }
}

async function addProductToCart(carts) {
  const { rows: product } = await client.query(`
    SELECT products.*,  products_in_cart.quantity, products_in_cart.id AS "productsInCartId", products_in_cart."cartId"
    FROM products
    JOIN products_in_cart ON products_in_cart."productsid" = products.id
    WHERE products_in_cart."cartid" IN (${carts
      .map((cart) => cart.id)
      .join(",")})   `);

  const newCart = carts.map((cart) => {
    const TheProduct = product.filter((Prod) => cart.id === Prod.cartid);
    cart.products = TheProduct;
    return cart;
  });
  return newCart;
}

async function cleanupCarts(productId) {
  try {
    const { rows: cartProducts } = await client.query(
      `
      DELETE FROM products_in_cart
      WHERE "productsid"=$1
      RETURNING *;
    `,
      [productId]
    );
    return cartProducts;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    cleanupCarts(productId);
    const { rows: product } = await client.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    `,
      [productId]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllProducts,
  createNewProduct,
  updateProduct,
  getAllProductsBySellerId,
  getProductById,
  deleteProduct,
};

const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    // drop tables in correct order
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS sales;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products_in_cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS users;
    `);
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rating INTEGER,
      isAdmin BOOLEAN DEFAULT false
    );
    CREATE TABLE carts(
      id SERIAL PRIMARY KEY,
      "usersid" INTEGER REFERENCES users(id),
      status VARCHAR(255) NOT NULL
    );
    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      "usersid" INTEGER REFERENCES users(id),
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price INTEGER,
      "categoryid" INTEGER REFERENCES categories(id),
      active BOOLEAN DEFAULT true
    );
    CREATE TABLE products_in_cart(
      id SERIAL PRIMARY KEY,
      "productsid" INTEGER REFERENCES products(id),
      "cartsid" INTEGER REFERENCES carts(id),
      quantity INTEGER
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "usersid" INTEGER REFERENCES users(id)
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
     "buyerId" INTEGER REFERENCES users(id) ,
     "sellerId" INTEGER REFERENCES users(id) ,
      "products_in_cartid" INTEGER REFERENCES products_in_cart(id)
    );
    `);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

client.connect();
buildTables()
  // .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

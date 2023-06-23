const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    // drop tables in correct order
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products_in_cart;
    DROP TABLE IF EXISTS product;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS users;
    `);
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userid" INTEGER REFERENCES users(id),
      status VARCHAR(255) NOT NULL
    );
    CREATE TABLE category(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE product(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price INTEGER,
      "categoryid" INTEGER REFERENCES category(id)
    );
    CREATE TABLE products_in_cart(
      id SERIAL PRIMARY KEY,
      "productid" INTEGER REFERENCES product(id),
      "cartid" INTEGER REFERENCES cart(id)
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "userid" INTEGER REFERENCES users(id),
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );
    `);
  } catch (error) {
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
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

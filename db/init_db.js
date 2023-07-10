const {
  client,
  createUser,
  createNewCategory,
  createNewProduct,
  getCartByUser,
  createNewCart,
  addProductToCart,
  getProductsInCartByCartId

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
    console.log('creating users...')
    const adminUser = await createUser( {email: 'admin@admin.admin', username: 'administrator', password: 'adminspassword'}, true);
    console.log('adminuser is ', adminUser);
    const user1 = await createUser( {email: 'user1@user1.user1', username: 'user1', password: 'user1spassword'});
    console.log('user1 is ', user1);
    const user2 = await createUser( {email: 'user2@user2.user2', username: 'user2', password: 'user2spassword'});
    console.log('user2 is ', user2);
    const user3 = await createUser( {email: 'user3@user3.user3', username: 'user3', password: 'user3spassword'});
    console.log('user3 is ', user3);
    console.log('successfully created users');

    console.log('creating categories...');
    const generalCategory = await createNewCategory('undefined')
    console.log('generalCategory is ', generalCategory);
    console.log('successfully created categories');



    console.log('creating products...');
    const product1 = await createNewProduct(
      2, 
      'Final Fantasy XIV account', 
      "This account has all classes fully leveled and has cleared all Ultimate Raids up to 6.4. Also includes the Regalia Type-G mount",
      500,
      1, 
      true
    );
    console.log('product1 is ', product1);
    const product2 = await createNewProduct(
      3, 
      'Valorant account', 
      "This account has the highest rank in ranked mode, pew pew",
      2000,
      1, 
      true
      );
    console.log('product2 is ', product2)
    const product3 = await createNewProduct(
      3, 
      'Genshin Impact Account', 
      "This account has every 5-star character released up to 3.8, as well as each character's personal weapons",
      10000,
      1, 
      true
      );
    console.log('product3 is ', product3);
    console.log('successfully created products');


    console.log('creating new carts...');
    const newCartArray = [];
    const cart1 = await createNewCart(1, 'idk');
    const cart2 = await createNewCart(2, 'something something');
    const cart3 = await createNewCart(3, 'status undefined');
    newCartArray.push(cart1);
    newCartArray.push(cart2);
    newCartArray.push(cart3);
    console.log('newCartArray is ', newCartArray);
    console.log('successfully created new carts');

    console.log('adding some products to cart with id 2...');
    await addProductToCart({productId: 1, cartId: 2, quantity: 1});
    await addProductToCart({productId: 2, cartId: 2, quantity: 1});
    const productsInCart2 = await getProductsInCartByCartId(2);
    console.log('productsInCart2 is ', productsInCart2);

    




    /*console.log('getting cart by userId 2');
    const thisCart = await getCartByUser(2);
    console.log('thisCart is ', thisCart);*/


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

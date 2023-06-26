// grab our db client connection to use with our adapters
const client = require('../client');


async function createNewProduct(usersid, name, description, price, categoryid = 0) {
    try {
        const { rows: [ product ]} = await client.query(`
            INSERT INTO products ("usersid", name, description, price, "categoryid")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [usersid, name, description, price, categoryid]);

        return product;
    }
    catch (error) {
        throw error;
    }
}

async function updateProduct(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }" ='${ fields[key]}'`
    ).join(', ');
    
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [ product ] } = await client.query(`
            UPDATE products
            SET ${ setString }
            WHERE id=${id}
            RETURNING *;
        `, []);

        return user;
    }
    catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const  { rows } = await client.query(`
            SELECT id, "usersid", name, description, price, "categoryid"
            FROM products;
        `);

        return rows;
    }
    catch(error) {
        throw error;
    }
}

async function getAllProductsBySellerId(userId) {
    try {
        const { rows: productIds } = await client.query(`
            SELECT id 
            FROM products
            WHERE "usersid"=$1;
        `, [userId]);

        const products = await Promise.all(productIds.map(
            product => getProductById( product.id )
        ));
        return products;
    }
    catch (error) {
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
        }
        else {
            return rows;
        }
    }
    catch(error) {
        throw error;
    }
}

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createNewProduct,
    updateProduct,
    getAllProductsBySellerId,
    getProductById
};


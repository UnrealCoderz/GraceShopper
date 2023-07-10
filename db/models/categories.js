const client = require("../client");



async function createNewCategory(categoryName) {
    try {
        const { rows: [category]} = await client.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *;
        `, [categoryName])
        return category;
    }
    catch (error) {
        throw (error);
    }
}

module.exports = {
    createNewCategory
};
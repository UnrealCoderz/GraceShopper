const products = [
    {
        id: 1,
        sellerId: 123,
        name: 'Product 1',
        description: 'This is the first product',
        price: 10.99,
        image: 'https://example.com/product1.jpg',
        categoryId: 1,
        active: true
    },
    {
        id: 2,
        sellerId: 456,
        name: 'Product 2',
        description: 'This is the second product',
        price: 19.99,
        image: 'https://example.com/product2.jpg',
        categoryId: 2,
        active: true
    },
    {
        id: 3,
        sellerId: 789,
        name: 'Product 3',
        description: 'This is the third product',
        price: 7.99,
        image: 'https://example.com/product3.jpg',
        categoryId: 1,
        active: true
    },
    {
        id: 4,
        sellerId: 123,
        name: 'Product 4',
        description: 'This is the fourth product',
        price: 10.99,
        image: 'https://example.com/product4.jpg',
        categoryId: 1,
        active: true
    },
    {
        id: 5,
        sellerId: 456,
        name: 'Product 5',
        description: 'This is the fifth product',
        price: 19.99,
        image: 'https://example.com/product5.jpg',
        categoryId: 2,
        active: true
    },
    {
        id: 6,
        sellerId: 789,
        name: 'Product 6',
        description: 'This is the sixth product',
        price: 7.99,
        image: 'https://example.com/product6.jpg',
        categoryId: 1,
        active: true
    }
];

// Example usage of the dummy data
console.log(products);  // Output the entire array of products
console.log(products[0]);  // Output the first product
console.log(products[0].name);  // Output the name of the first product

export default products;
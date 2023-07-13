import React from 'react';
import productsData from './seedData';
import './Products.css';
import SingleProductView from './SingleProductPage';

const ProductsView = ({ products, addToCart }) => {
    return (
        <div>
            <h2>Products</h2>
            <div className="products-container">
                {productsData.map(product => (
                    <ProductDetails key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsView;

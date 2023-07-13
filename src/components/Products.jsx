import React from 'react';
import productsData from './seedData';
import SingleProduct from './SingleProduct';
import './products.css';

const Products = ({ products, addToCart }) => {
    return (
        <div className="products-page">
            <h2 className="page-title">Products</h2>
            <div className="products-container">
                {productsData.map(product => (
                    <div className="product-card" key={product.id}>
                        <SingleProduct product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

import React from 'react';
import productsDatas from './seedData';
import SingleProduct from './SingleProduct';
import './products.css';

const Products = ({ user, productsData, addToCart }) => {
    return (
        <div className="products-page">
            <h2 className="page-title">Products</h2>
            <div className="products-container">
                {productsDatas.map(product => (
                    <div className="product-card" key={product.id}>
                        <SingleProduct product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

import React, { useState, useEffect } from 'react';

const SingleProduct = ({ product, addCart }) => {
    const handleClick = () => {
        // Handle click event, e.g., open a modal or navigate to a new page
        console.log('Product clicked:', product);
    };

    return (
        <div className="product" onClick={handleClick}>
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <img className="image" src={product.image} alt={product.name} />
        </div>
    );
};

export default SingleProduct;

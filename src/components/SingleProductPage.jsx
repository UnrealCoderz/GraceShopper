import React, { useState, useEffect } from 'react';

const SingleProductView = ({ product, addCart }) => {
    const handleClick = () => {
        // Handle click event, e.g., open a modal or navigate to a new page
        console.log('Product clicked:', product);
    };

    return (
        <div onClick={handleClick}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.name} />
        </div>
    );
};

export default SingleProductView;
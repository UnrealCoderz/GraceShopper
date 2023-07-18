import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './singleproduct.css';
import SingleProduct from './SingleProduct';

const SingleProductPage = ({ productsData }) => {
    let { productId } = useParams();
    const thisProduct = productsData[productId - 1];
    console.log('thisProduct is ', thisProduct);
    return (
        <div className="product">
            <h3>{thisProduct.name}</h3>
            <p className="description">{thisProduct.description}</p>
            <p className="price">Price: ${thisProduct.price}</p>
            <img className="product-card-image" src={thisProduct.image} alt={thisProduct.name} />
            <button>Add to Cart</button>
        </div>
    );
};

export default SingleProductPage;
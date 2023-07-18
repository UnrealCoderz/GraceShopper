import React, { useEffect } from 'react';
import SingleProduct from './SingleProduct';
import { useHistory } from "react-router-dom";
import { GetAllProducts } from '../api';
import './products.css';

const Products = ({ user, productsData, setProductsData, addToCart }) => {
    useEffect(() => {
        const updateProducts = async () => {
            const newProductsData = await GetAllProducts();
            setProductsData(newProductsData);
        }
        updateProducts();
    }, [])
    return (
        <div className="products-page">
            <h2 className="page-title">Products</h2>
            <div className="products-container">
                {productsData.map(product => (
                    <div className="product-card" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product, addCart }) => {
    const navigate = useHistory();
    const handleClick = () => {

        // Handle click event, e.g., open a modal or navigate to a new page
        navigate.push(`/product/${product.id}`);
    };
    const handleButtonClick = () => {
        console.log('added to cart!')
    }

    return (
        <div className="product" >
            <h3 onClick={handleClick}>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <img onClick={handleClick} className="product-card-image" src={product.image} alt={product.name} />
            <button className='add-to-cart-button' onClick={handleButtonClick} >Add to Cart</button>
        </div>
    );
};

export default Products;

import React, { useEffect } from 'react';
import SingleProduct from './SingleProduct';
import { useHistory } from "react-router-dom";
import { GetAllProducts, addToCartDb } from '../api';
import './products.css';

const Products = ({ user, productsData, setProductsData, addToCart, cartItems, setCartItems }) => {
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
                        <ProductCard product={product} user={user} setProductsData={setProductsData} productsData={productsData} setCartItems={setCartItems} cartItems={cartItems}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product, addCart, user, setProductsData, productsData, setCartItems, cartItems }) => {
    const navigate = useHistory();
    const handleClick = () => {

        // Handle click event, e.g., open a modal or navigate to a new page
        navigate.push(`/product/${product.id}`);
    };
    async function handleButtonClick(event) {
        event.preventDefault();
        if (user) {
            console.log('product is ', product);
            console.log('productId is, ', product.id);
            const newProduct = await addToCartDb(product.id, user.id);
            console.log('newProduct is ', product);
            // console.log('product is ', product);
            //newProduct.productInfo = product;
            // console.log('newProduct is ', newProduct)
            // const newArray = cartItems;
            //newArray.push(newProduct);
            // //console.log('newProduct is ', newProduct[0]);
            console.log('cartItems is ', cartItems);
            // console.log('newArray is ', newArray);
            setCartItems([...cartItems, product]);

        }
        else {
            console.log(localStorage["Local Cart"]);
        }
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

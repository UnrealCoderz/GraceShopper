import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import productsData from './seedData';
import './cart.css';
import { addToCartDb } from '../api';
import Checkout from './Checkout';

const parseFromLocalCart = () => {
    console.log('no user, parse from local storage');
    console.log('localStorage is ', localStorage);
}

const removeFromLocalCart = () => {
    console.log('no user, remove from local storage');
    console.log('localStorage is ', localStorage);
}

const Cart = ({ isOpen, onClose, removeFromCart, setCartCount, user, token, cartItems, setCartItems }) => {
    //const [cartItems, setCartItems] = useState(productsData);
    const navigate = useHistory();
    const [checkOut, setCheckOut] = useState(false)
    const [removedItemId, setRemoveItemId] = useState(0);
    const removeItem = (itemId) => {
            // console.log('itemId is ', itemId);
            // for (let i = 0; i < cartItems.length; i++) {
            //     let curr = cartItems[i]
            //     if (curr.id === itemId) {
            //         delete cartItems[i]
            //     }
                
            // }
        console.log('cartItems is ', cartItems);
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        console.log('updated cartItems is ', cartItems);
        setCartCount(cartItems.length)
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleItemClick = (itemId) => {
        // send user to the single product view route and display that
        // navigate();
        console.log(`View item with ID: ${itemId}`);
    };

    useEffect(() => {
        setCartCount(cartItems.length);
        if (user) {
            console.log('logic for parsing cart from db');
            console.log('cartItems is ', cartItems);
        }
        else {
            parseFromLocalCart();
        }
    }, [cartItems]);

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="cart-modal">
            <div className="cart-content">
                <h2 className="cart-title">Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <ul className='cart-list'>
                        {cartItems.map((item) => (
                            <li className='single-item' key={item.id}>
                                <span className='item-image' onClick={() => handleItemClick(item.id)}>
                                    {/* <img src={item.image} alt={item.name} /> */}
                                </span>
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                                <button className='remove-button' onClick={() => removeItem(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>Total: ${calculateTotalCost()}</p>
            </div>
            <button className="close-button" onClick={onClose}>
                Close
            </button>
            <button onClick={()=>{setCheckOut(true)}}>CheckOut</button>
            {checkOut &&(
                <Checkout cartItems={cartItems}/>
            )}
        </div>,
        document.getElementById('cart-root')
    );
};

export default Cart;

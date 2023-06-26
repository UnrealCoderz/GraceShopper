import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartSidebarrt = () => {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        { id: 1, creatorid: 1, name: 'Product 1', description: 'Product 1 info', price: 10, image: 'item1.png', categoryId: 1, },
        { id: 2, creatorid: 2, name: 'Product 2', description: 'Product 2 info', price: 15, image: 'item2.png', categoryId: 2, },
        { id: 3, creatorid: 3, name: 'Product 3', description: 'Product 3 info', price: 20, image: 'item3.png', categoryId: 3, },
    ]);
    const navigate = useNavigate();

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleItemClick = (itemId) => {
        // send user to the single product view route and display that
        // navigate();
        console.log(`View item with ID: ${itemId}`);
    };

    return (
        <div className={`cart-sidebar ${open ? 'open' : ''}`}>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <span className="item-image" onClick={() => handleItemClick(item.id)}>
                                <img src={item.image} alt={item.name} />
                            </span>
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${calculateTotalCost()}</p>
        </div>
    );
};

export default CartSidebar;
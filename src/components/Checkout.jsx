import React from "react";
import { useState } from "react";

const Checkout = ({ cartItems }) => {
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardSec, setCardSec] = useState("");

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    setCartCount(cartItems.length);
    removeFromCart();
  };
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  return (
    <>
      <h1>Thank You FOr Shopping With Us!</h1>
      <p>Order Summary</p>
      {cartItems.map((item) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          {/* <button onClick={() => removeItem(item.id)}>Remove</button> */}
        </li>
      ))}
      <h2>You'll be paying {calculateTotalCost()}</h2>
      <h1>Card Information</h1>
      <form>
        <input
          onChange={(event) => {
            setCardName(event.target.value);
          }}
          placeholder="*Name as it appears on card"
        ></input>
        <input
          onChange={(event) => {
            setCardNum(event.target.value);
          }}
          type="number"
          step="1"
          placeholder="*Card Number"
        ></input>
        <input
          onChange={(event) => {
            setCardSec(event.target.value);
          }}
          type="number"
          placeholder="*CVV"
          maxLength={4}
          step="1"
        ></input>
        <button>Purchase</button>
      </form>
    </>
  );
};

export default Checkout;
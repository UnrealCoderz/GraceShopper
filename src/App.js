import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [singleProductPath, setSingleProductPath] = useState('');
  const [token, setToken] = useState("");
  const openCart = () => {
    setCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const removeFromCart = () => {
    cartCount <= 0 ? setCartCount(0) : setCartCount(cartCount - 1);
  };

  // useEffect(() => {
  // }, []);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-item nav-list">
            <li className="nav-title">
              <Link to="/">Unreal Boosters</Link>
            </li>
            <li className="nav-item">
              {token && <p>{token.token}</p>}
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item-cart" onClick={openCart}>
              {/* <span className='cart-image'>Cart</span> */}
              <span onClick={openCart}>Cart: {cartCount}</span>
            </li>
          </ul>
        </nav >
        <div className="app-container">
          <Cart isOpen={isCartOpen} onClose={closeCart} removeFromCart={removeFromCart} setCartCount={setCartCount} />
          <Switch>
            <Route exact path="/" component={Home} isLoggedIn={isLoggedIn} token={token} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <Route exact path="/login" component={Login} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <Route exact path="/logout" component={Logout} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <Route exact path="/products" component={Products} addToCart={addToCart} />
            <Route exact path="/product" component={SingleProduct} addToCart={addToCart} />
          </Switch >
        </div >
      </div >
    </Router >
  );
};

export default App;

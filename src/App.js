import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Products from './components/Products';
import SingleProductPage from './components/singleProductPage';
import { myData, getAllProducts, GetAllProducts } from "./api/index";
import productsData from "./components/seedData";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [singleProductPath, setSingleProductPath] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);
  
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

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();

      console.log(products, "HEEE");
    };
    fetchProducts();
  }, []);

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
            {!token && (
              <>
                <li className="nav-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">Register</Link>
                </li>{" "}
              </>
            )}
            <li className="nav-item-cart" onClick={openCart}>
              {/* <span className='cart-image'>Cart</span> */}
              <span onClick={openCart}>Cart: {cartCount}</span>
            </li>
          </ul>
        </nav>
        <div className="app-container">
          <Cart
            isOpen={isCartOpen}
            onClose={closeCart}
            removeFromCart={removeFromCart}
            setCartCount={setCartCount}
          />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            </Route>
            <Route path="/logout">
              <Logout setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/">
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                token={token}
                user={user}
                setToken={setToken}
              />
            </Route>
            <Route path="/product/:productId">
              <SingleProductPage productsData={productsData}/>
            </Route>
            <Route path="/products">
              <Products user={user} productsData={productsData} setProductsData={setProductsData} addToCart={addToCart} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

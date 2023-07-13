import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Login from './users/Login';
import Register from './users/Register';
import Logout from './users/Logout';
import Cart from './Cart';
import ProductsPage from './ProductsPage'
import SingleProductPage from './SingleProductPage'

const About = () => <h2>About</h2>;
// const Products = () => <h2>Products</h2>;
// const Accounts = () => <h2>Accounts</h2>;
// const Skins = () => <h2>Skins</h2>;
// const Other = () => <h2>Other</h2>;
const Users = () => <h2>Users</h2>;

function Home({ isLoggedIn, email }) {
  return (
    <div>
      <h1>Welcome to UnrealBoosters!</h1>
      {isLoggedIn ? (
        <div>Welcome, {email}!</div>
      ) : (
        <p>Please <Link to="/users/login">login</Link> or <Link to="/users/register">register</Link>.</p>
      )}
      <h2>Today's featured product:</h2>
      <FeaturedProduct featuredProductName={'placeholderName'} />
    </div>
  );
}

function FeaturedProduct(props) {
  const featuredProductName = props.featuredProductName;
  return (
    <div className='featured-product-container'>
      <h3>{featuredProductName}</h3>
      <img src='../images/placeholder_img.PNG' />
      <p>This is a placeholder description, I'm sure we'll add more later</p>
    </div>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0);
  const [singleProductPath, setSingleProductPath] = useState('');

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  // useEffect(() => {
  // }, []);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item cart" onClick={toggleCart}>
              {/* <span className='cart-image'>Cart</span> */}
              <span>Cart: {cartCount}</span>
              {cartOpen && <Cart />}
            </li>
          </ul>
        </nav>
        <div className="app-container">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
            </Route>
            <Route path="/register">
              <Register setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
            </Route>
            <Route path="/logout">
              <Logout setIsLoggedIn={setIsLoggedIn} />
            </Route>
            {/* <Route path="/">
              <Home isLoggedIn={isLoggedIn} email={email} />
            </Route>
            <Route exact path="/" component={Home} /> */}
            <Route path="/about" component={About} />
            <Route exact path="/products" component={ProductsPage} addToCart={addToCart} />
            <Route exact path="/product" component={SingleProductPage} addToCart={addToCart} />
            {/* <Route path="/products/accounts" component={Accounts} />
            <Route path="/products/skins" component={Skins} />
            <Route path="/products/other" component={Other} /> */}
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

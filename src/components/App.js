import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Login from './users/Login'; 
import Register from './users/Register';
import Logout from './users/Logout';
import Cart from './Cart';

const About = () => <h2>About</h2>;
const Products = () => <h2>Products</h2>;
const Accounts = () => <h2>Accounts</h2>;
const Skins = () => <h2>Skins</h2>;
const Other = () => <h2>Other</h2>;
const Users = () => <h2>Users</h2>;

function Home({ isLoggedIn, email }) {
  return (
    <div>
      <h2>Home</h2>
      {isLoggedIn ? (
        <div>Welcome, {email}!</div>
      ) : (
        <div>Please <Link to="/users/login">login</Link> or <Link to="/users/register">register</Link>.</div>
      )}
    </div>
  );
}

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [cartOpen, setCartOpen] = useState(false)

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    getAPIStatus();
  }, []);

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
            <li className="nav-item dropdown">
              <span className="dropdown-toggle">Products</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/products/accounts">Accounts</Link>
                </li>
                <li>
                  <Link to="/products/skins">Skins</Link>
                </li>
                <li>
                  <Link to="/products/other">Other</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item cart" onClick={toggleCart}>
              <span className='cart-image'>Cart</span>
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
          <Route path="/">
            <Home isLoggedIn={isLoggedIn} email={email}/>
          </Route>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/accounts" component={Accounts} />
            <Route path="/products/skins" component={Skins} />
            <Route path="/products/other" component={Other} />
            <Route path="/cart" component={Cart} />
          </Switch>
          <h1>Hello, World!</h1>
          <p>API Status: {APIHealth}</p>
        </div>
      </div>
    </Router>
  );
};

export default App;

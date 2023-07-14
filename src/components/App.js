import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Login from "./users/Login";
import Register from "./users/Register";
import Logout from "./users/Logout";
import Home from "./home/home";
import Cart from "./Cart";
import { myData } from "../api";
const About = () => <h2>About</h2>;
const Products = () => <h2>Products</h2>;
const Accounts = () => <h2>Accounts</h2>;
const Skins = () => <h2>Skins</h2>;
const Other = () => <h2>Other</h2>;
const Users = () => <h2>Users</h2>;

function FeaturedProduct(props) {
  const featuredProductName = props.featuredProductName;
  return (
    <div className="featured-product-container">
      <h3>{featuredProductName}</h3>
      <img src="../images/placeholder_img.PNG" />
      <p>This is a placeholder description, I'm sure we'll add more later</p>
    </div>
  );
}

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    getAPIStatus();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              {token && <p>{token.token}</p>}
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
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
              <span className="cart-image">Cart</span>
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
              <Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            </Route>
            <Route path="/logout">
              <Logout setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/">
              <Home user={user} token={token} />
            </Route>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/accounts" component={Accounts} />
            <Route path="/products/skins" component={Skins} />
            <Route path="/products/other" component={Other} />
            <Route path="/cart" component={Cart} />
          </Switch>
          {/*<h1>Hello, World!</h1>
          <p>API Status: {APIHealth}</p>*/}
        </div>
      </div>
    </Router>
  );
};

export default App;

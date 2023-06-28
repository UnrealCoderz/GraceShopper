import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Login from './users/Login'; 
import Register from './users/Register';
import Logout from './users/Logout';

export default function App() {
  const [APIHealth, setAPIHealth] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    getAPIStatus();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>

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
        </Switch>
      </div>
    </Router>
  );
}

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

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
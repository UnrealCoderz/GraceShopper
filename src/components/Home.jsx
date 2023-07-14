import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Cart from './Cart';

const Home = ({ isLoggedIn, token }) => {
    const [showCart, setShowCart] = useState(false)
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome to UnrealBoosters!</h1>
                    <div>Welcome,{user.username} </div>
                    {/* <h2>{token}</h2> */}
                </div>
            ) : (
                <div>
                    <p>
                        Please <Link to="/login">login</Link> or{" "}
                        <Link to="/register">register</Link>.
                    </p>
                    {/* <About /> */}
                </div>
            )}
        </div>
    );
};

export default Home;

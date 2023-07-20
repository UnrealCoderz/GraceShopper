import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import CreateProduct from "./CreateProduct";
import { useHistory } from "react-router-dom";
const Home = ({ isLoggedIn, token, user, setToken, setIsLoggedIn, products, setProducts }) => {
  const navigate = useHistory();
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <img className='main-logo' src ="https://cdn.discordapp.com/attachments/1078491602454069340/1131374790423367740/gameboosters_480.png" />
      {isLoggedIn ? (
        <div>
          <h1>Welcome to UnrealBoosters!</h1>
          {user && (
            <div>
              Welcome,{user.username}{" "}
              <span>
                <button
                  onClick={() => {
                    setToken("");
                    navigate.push("/login");
                  }}
                >
                  LogOut
                </button>
              </span>{" "}
            </div>
          )}
          {/* <h2>{token}</h2> */}
          <button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create Sale
          </button>
          {showForm && <CreateProduct setShowForm={setShowForm} user={user} products={products} setProducts={setProducts} token={token}/>}
        </div>
      ) : (
        <div>
          <p>
            Please <button> <Link to="/login">login</Link> </button> or{" "} <button>
            <Link to="/register">register</Link>. </button>
          </p>
          {/* <About /> */}
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import CreateProduct from "./CreateProduct";
import { useHistory } from "react-router-dom";
const Home = ({ isLoggedIn, token, user, setToken, setIsLoggedIn }) => {
  const navigate = useHistory();
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
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
          {showForm && <CreateProduct setShowForm={setShowForm} user={user} />}
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

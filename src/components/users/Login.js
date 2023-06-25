import React from "react";
import { BrowserRouter } from "react-router";
import { LoginPerson } from "../../api";
import { Register } from "../index";

const Login = ({ setIsLoggedIn, setEmail }) => {
    const navigate = useNavigate();
  
    async function handleSubmit(event) {
      event.preventDefault();
      const loginEmail = event.target[0].value;
      const result = await LoginPerson(event);
  
      if (result.token) {
        setIsLoggedIn(true);
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", loginEmail);
        setEmail(loginEmail);
      } else {
        alert(result.error);
      }
  
      navigate("/");
    }
    return (
      <>
        <div className="loginContainer">
          <form onSubmit={handleSubmit}>
            <h1>Log into Your Account</h1>
            <div className="loginBox">
              <label className="inputLabels">
                Email:
                <input
                  className="inputBox"
                  id="email"
                  type="text"
                  placeholder="Your Email Here"
                />
              </label>
              <label className="inputLabels">
                Password:
                <input
                  className="inputBox"
                  id="password"
                  type="password"
                  placeholder="Your Password Here"
                />
              </label>
              <button id="submit" type="Submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        <Register setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
      </>
    );
  };
  export default Login;
import React from "react";
import { useHistory } from "react-router-dom";
import { RegisterPerson } from "../api/index.js";
import { useState } from "react";

const Register = ({ setToken, setIsLoggedIn }) => {
  const navigate = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const NewUser = {
        email: email,
        username: username,
        password: password,
      };
      const newUserToken = await RegisterPerson(NewUser);
      if (newUserToken.error) {
        throw new Error(newUserToken.message);
      }
      setToken(newUserToken);
      localStorage.setItem("The Goods", newUserToken.token);
      setIsLoggedIn(true);
      if (newUserToken) {
        navigate.push("/home");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div className="loginContainer" id="registerBox">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up for an Account</h1>
        <div className="loginBox">
          <label className="inputLabels">Enter Email:</label>
          <input
            className="inputBox"
            type="text"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <label className="inputLabels">Create Password:</label>
          <input
            className="inputBox"
            placeholder="8 Characters Minimum"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <label className="inputLabels">Enter Your Username:</label>
          <input
            className="inputBox"
            placeholder="Enter Your Username"
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
          <p>{errorMessage}</p>
          <button>CREATE ACCOUNT</button>
        </div>
      </form>
    </div>
  );
};
export default Register;

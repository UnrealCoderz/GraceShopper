import React from "react";
import { useHistory } from "react-router-dom";
import { LoginPerson } from "../api/index";
import { useState } from "react";

const Login = ({ setToken }) => {
  const navigate = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const NewUser = {
        email: email,

        password: password,
      };
      const newUserToken = await LoginPerson(NewUser);
      if (newUserToken.error) {
        throw new Error(newUserToken.message);
      }

      setToken(newUserToken);
      if (newUserToken) {
        navigate.push("/Home");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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

          <p>{errorMessage}</p>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;

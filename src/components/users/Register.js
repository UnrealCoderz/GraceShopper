import React from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import { RegisterPerson } from "../../api/index.js";


const Register = ({ setEmail, setIsLoggedIn }) => {
  const navigate = useHistory();
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await RegisterPerson(event);
    if (result.token) {
      setIsLoggedIn(true);
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.user.email);
      setEmail(result.user.email);
      alert("You have successfully created an account!");
      navigate("/Home");
    } else if (result.error) {
      alert(result.error);
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
            id="emailregister"
            placeholder="Enter Your Email"
            required
          ></input>
          <label className="inputLabels">Create Password:</label>
          <input
            className="inputBox"
            id="passwordregister"
            placeholder="8 Characters Minimum"
          ></input>
          <label className="inputLabels">Enter Your Full Name:</label>
          <input
            className="inputBox"
            id="fullnameregister"
            placeholder="Enter Your Full Name"
            required
          ></input>
          <button type="submit">CREATE ACCOUNT</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
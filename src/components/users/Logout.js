import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(false);
    navigate("/users/Login");
  });
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return <div></div>;
};
export default Logout;
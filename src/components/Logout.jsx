import React, { useEffect } from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
const Logout = ({ setIsLoggedIn }) => {
  const navigate = useHistory();
  useEffect(() => {
    setIsLoggedIn(false);
    navigate("/Login");
  });
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return <div></div>;
};
export default Logout;
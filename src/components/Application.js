import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import SignIn from "./SignIn";

const Application = () => {
  const user = useContext(UserContext);
  return user ? (
    <Home />
  ) : (
    <Router>
      <SignIn path="/" />
    </Router>
  );
};

export default Application;

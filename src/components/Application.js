import React, { useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'

import { UserContext } from "../providers/UserProvider";

const Application = () => {
  const user = useContext(UserContext);
  console.log(user)
  return (
    user ?
      <Home />
    :
    <Router>
      <SignIn path="/" />
    </Router> 
  );
}

export default Application;

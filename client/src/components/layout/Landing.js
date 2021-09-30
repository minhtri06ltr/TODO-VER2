import React from "react";
import { Redirect } from "react-router-dom";
function Landing() {
  //when user go to home api/ default direct to route login
  return <Redirect to="/login" />;
}

export default Landing;

import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";

//authRoute is props receive from App.js
function Auth({ authRoute }) {
  //get state of AuthContext
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  //defined body
  let body;
  //authLoading = true - website is verifying
  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner
          animation="border"
          variant="info"
        />
      </div>
    );
  //authLoading = false - website has verified
  //isAuthenticated = true - user is correct
  else if (isAuthenticated)
    return <Redirect to="/dash-board" />;
  //all are fail
  else
    body = (
      <>
        {
          // if props - authRoute is login direct to component LoginForm to handler
          authRoute === "login" && <LoginForm />
        }
        {authRoute === "register" && (
          <RegisterForm />
        )}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Your learning list</h1>
          <h4>
            Keep an eye on what you want to do or
            learning
          </h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;

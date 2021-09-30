import React, { useContext } from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarMenu from "../layout/NavbarMenu";

//when user at route /api/dash-board
//if lost accessToken or delete in storage
//protected route will redirect user to route api/login
//props is component receive from App.js
//component:Component - change name props
//...rest: example abc=def
function ProtectedRoute({
  component: Component,
  ...rest
}) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  //authLoading = true - website is verifying
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner
          animation="border"
          variant="info"
        />
      </div>
    );
  //authLoading = false - website has verified
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? ( //verify = true
          //allow user going
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;

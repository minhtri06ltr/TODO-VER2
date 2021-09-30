import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import About from "./views/About";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={Landing}
            />{" "}
            {/*direct to component Landing*/}
            {/*When url or login or register auto direct to Auth component and send authRoute to know user want login or register*/}
            <Route
              exact
              path="/login"
              render={(props) => (
                <Auth
                  {...props}
                  authRoute="login"
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Auth
                  {...props}
                  authRoute="register"
                />
              )}
            />
            <ProtectedRoute
              exact
              path="/dash-board"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/about"
              component={About}
            />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

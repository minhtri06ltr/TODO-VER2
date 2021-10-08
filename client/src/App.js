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
import UserContextProvider from "./contexts/UserContext";
import About from "./views/About";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                component={Landing}
              />
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
              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
              />
            </Switch>
          </Router>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;

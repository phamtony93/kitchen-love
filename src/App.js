import React, { useState, useEffect } from "react";
import Login from "./screens/Login";
import Feed from "./screens/Feed";
import Profile from "./screens/Profile";
import ForbiddenAccess from "./screens/ForbiddenAccess";
import NotFound from "./screens/NotFound";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Checkout from "./screens/Checkout/Checkout";
import Cart from "./screens/Cart";
import OrderHistory from "./screens/OrderHistory/OrderHistory";
import MainNavBar from "./components/MainNavBar/MainNavBar";
import Jumbotron from "./components/Jumbotron";
import Store from "./screens/Store/Store";
import "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth, getAccessableRoutesFromRole, getUserRole } from "./firebase";
import { useStateProviderValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HRtvKL0MubunR6nOpOJU3tgVMP2kNGQDJRG3lMmR38iBEkkFjELinxpK6nsXvAEeViPhBo4N9BoFz0T4MQHMrmX002C9WucMh"
);

function App() {
  // use localstorage to persist on refresh
  let [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true" ? true : false
  );
  let [role, setRole] = useState(
    localStorage.getItem("role") ? localStorage.getItem("role") : "anonymous"
  );

  const [
    { user, userRole, accessableRoutes },
    dispatch,
  ] = useStateProviderValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        //logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });

        const role = await getUserRole(authUser.uid);
        dispatch({
          type: "SET_ROLE",
          userRole: role,
        });

        const routes = await getAccessableRoutesFromRole(role);
        dispatch({
          type: "SET_ACCESSABLE_ROUTES",
          accessableRoutes: routes,
        });
      } else {
        //logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <MainNavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setRole={setRole}
        />
        <Jumbotron />
        <Layout>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route
              path="/login"
              render={(props) => {
                return (
                  <Login
                    {...props}
                    setAuthenticated={setAuthenticated}
                    setRole={setRole}
                    authenticated={authenticated}
                  />
                );
              }}
            />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <ProtectedRoute path="/order-history" component={OrderHistory} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/store" component={Store} />
            <ProtectedRoute path="/checkout">
              <Elements stripe={promise}>
                <Checkout />
              </Elements>
            </ProtectedRoute>
            <ProtectedRoute path="/cart" component={Cart} />
            <Route path="/403" component={ForbiddenAccess} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateProviderValue } from "../StateProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [{ user, accessableRoutes }] = useStateProviderValue();

  const checkUserAccessableRoutes = (route) => {
    if (accessableRoutes === null) return false;
    if (accessableRoutes.includes(route)) {
      return true;
    } else {
      return false;
    }
  };

  const isAuthenticated = user ? true : false;

  return (
    <Route
      {...rest}
      render={(props) => {
        const { path } = { ...rest };
        const route = path.slice(1);
        const isAuthorized = isAuthenticated
          ? checkUserAccessableRoutes(route)
          : false;
        if (isAuthenticated && isAuthorized) {
          return <Component {...props} />;
        } else if (isAuthenticated && !isAuthorized) {
          return <Redirect to="/403" />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

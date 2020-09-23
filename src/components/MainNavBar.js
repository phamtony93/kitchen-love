import React from "react";
import {
  Navbar,
  Nav,
  NavLink,
  NavbarBrand,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../firebase";
import { useStateProviderValue } from "../StateProvider";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LoginIcon from "@material-ui/icons/PersonAdd";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import HistoryIcon from "@material-ui/icons/History";
import { Tooltip } from "@material-ui/core";

const MainNavBar = (props) => {
  const [{ user, accessableRoutes }] = useStateProviderValue();
  const isAuthenticated = user ? true : false;

  const checkUserAccessableRoutes = (route) => {
    if (accessableRoutes === null) return false;
    if (accessableRoutes.includes(route)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Navbar className="bg-dark">
      <NavbarBrand className="text-info" as={Link} to="/">
        KL
      </NavbarBrand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Form className="inline mr-auto">
          <FormControl
            type="text"
            placeholder="Search kitchens"
            className="mr"
          />
        </Form>
        <Nav>
          <NavLink className="text-info" as={Link} to="/">
            Home
          </NavLink>
          <NavLink className="text-info" as={Link} to="/about">
            About
          </NavLink>
          <NavLink className="text-info" as={Link} to="/contact">
            Contact
          </NavLink>
          <NavDropdown
            className="text-info"
            left
            title={<span className="text-info">Account</span>}
          >
            {isAuthenticated && checkUserAccessableRoutes("profile") ? (
              <NavDropdown.Item>
                <NavLink className="text-info" as={Link} to="/profile">
                  <Tooltip title="Profile">
                    <ProfileIcon />
                  </Tooltip>
                </NavLink>
              </NavDropdown.Item>
            ) : null}
            {isAuthenticated && checkUserAccessableRoutes("cart") ? (
              <NavDropdown.Item>
                <NavLink className="text-info" as={Link} to="/cart">
                  <Tooltip title="Cart">
                    <ShoppingCartIcon />
                  </Tooltip>
                </NavLink>
              </NavDropdown.Item>
            ) : null}
            {isAuthenticated && checkUserAccessableRoutes("order-history") ? (
              <NavDropdown.Item>
                <NavLink className="text-info" as={Link} to="/order-history">
                  <Tooltip title="Order History">
                    <HistoryIcon />
                  </Tooltip>
                </NavLink>
              </NavDropdown.Item>
            ) : null}
            {isAuthenticated ? (
              <NavDropdown.Item>
                <NavLink
                  className="text-info"
                  as={Link}
                  to="/"
                  onClick={() => logout()}
                >
                  <Tooltip title="Logout">
                    <LogoutIcon />
                  </Tooltip>
                </NavLink>
              </NavDropdown.Item>
            ) : (
              <NavDropdown.Item>
                <NavLink className="text-info" as={Link} to="/login">
                  <Tooltip title="Login">
                    <LoginIcon />
                  </Tooltip>
                </NavLink>
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;

import React from 'react';
import { Navbar, Nav, NavLink, NavbarBrand, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout, checkUserAccessableRoutes } from '../firebase'

const MainNavBar = (props) => {
    let isAuthenticated = props.authenticated === "true" || props.authenticated === true ? true : false
    console.log('navbar build')
    // console.log(props.authenticated)
    console.log(checkUserAccessableRoutes('profile'))
    console.log(localStorage.getItem("accessableRoutes"))
    return (
        <Navbar className="bg-dark">
            <NavbarBrand className="text-info">KL</NavbarBrand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Form className="inline mr-auto">
                    <FormControl type="text" placeholder="Search kitchens" className="mr"/>
                </Form>
                <Nav>
                    <NavLink className="text-info" as={Link} to='/'>Home</NavLink>
                    <NavLink className="text-info" as={Link} to='/about'>About</NavLink>
                    <NavLink className="text-info" as={Link} to='/contact'>Contact</NavLink>
                    <NavDropdown className="text-info" left title={
                            <span className="text-info">Account</span>
                    }>
                        {isAuthenticated && checkUserAccessableRoutes('profile') ? <NavDropdown.Item><NavLink className="text-info" as={Link} to='/profile'>Profile</NavLink></NavDropdown.Item> : null}
                        {isAuthenticated && checkUserAccessableRoutes('cart') ? <NavDropdown.Item><NavLink className="text-info" as={Link} to='/cart'>Cart</NavLink></NavDropdown.Item> : null}
                        {isAuthenticated && checkUserAccessableRoutes('order-history') ? <NavDropdown.Item><NavLink className="text-info" as={Link} to='/order-history'>Order History</NavLink></NavDropdown.Item> : null}
                        {props.authenticated 
                            ? <NavDropdown.Item><NavLink className="text-info" as={Link} to='/' onClick={() => logout(props.setAuthenticated, props.setRole)}>Logout</NavLink></NavDropdown.Item> 
                            : <NavDropdown.Item><NavLink className="text-info" as={Link} to="/login">Login</NavLink></NavDropdown.Item>}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default MainNavBar;
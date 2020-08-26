import React from 'react';
import { Navbar, Nav, NavLink, NavbarBrand, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavBar = (props) => {

    return (
        <Navbar className="bg-dark">
            <NavbarBrand className="text-info">KL</NavbarBrand>
            <Form className="inline mr-auto">
                <FormControl type="text" placeholder="Search kitchens" className="mr"/>
            </Form>
            <Nav>
                <NavLink className="text-info" as={Link} to='/'>Home</NavLink>
                <NavLink className="text-info" as={Link} to="/profile">Profile</NavLink>
                {/* <NavLink className="text-primary" >About</NavLink> */}
            </Nav>
            {props.authenticated ? <NavLink className="text-info" as={Link} to='/'>Logout</NavLink> : <NavLink className="text-info" as={Link} to="/login">Login</NavLink>}
        </Navbar>
    );
}

export default MainNavBar;
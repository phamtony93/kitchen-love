import React from 'react';
import { Navbar, Nav, NavLink, NavbarBrand, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../firebase'

const MainNavBar = (props) => {

    return (
        <Navbar className="bg-dark">
            <NavbarBrand className="text-info">KL</NavbarBrand>
            <Form className="inline mr-auto">
                <FormControl type="text" placeholder="Search kitchens" className="mr"/>
            </Form>
            <Nav>
                <NavLink className="text-info" as={Link} to='/'>Home</NavLink>
                <NavLink className="text-info" as={Link} to='/about'>About</NavLink>
                <NavLink className="text-info" as={Link} to='/contact'>Contact</NavLink>
                <NavDropdown className="text-info" title={
                        <span className="text-info">Account</span>
                }>
                    <NavLink className="text-info" as={Link} to='/profile'>Profile</NavLink>
                    <NavLink className="text-info" as={Link} to='/cart'>Cart</NavLink>
                    {props.authenticated 
                        ? <NavLink className="text-info" as={Link} to='/' onClick={() => logout(props.setAuthenticated, props.setRole)}>Logout</NavLink> 
                        : <NavLink className="text-info" as={Link} to="/login">Login</NavLink>}
                </NavDropdown>

            </Nav>
            
        </Navbar>
    );
}

export default MainNavBar;
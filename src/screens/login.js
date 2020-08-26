import React from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { login } from '../firebase';
import {Redirect } from 'react-router-dom';

const Login = (props) => {

    let isAuthenticated = (props.authenticated === "true" || props.authenticated === true) ? true : false;
    if (isAuthenticated) {
        return <Redirect to='/' />
    } else {
        return (
            <Container className="h-100">
                <Col className="justify-content-center align-self-center">
                    <h2>Welcome to Kitchen Love</h2>
                    <Button onClick={ () => login(props.setAuthenticated, props.setRole)}>Login With Facebook</Button>
                </Col>
            </Container>
        )
    }
}

export default Login;
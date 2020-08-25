import React from 'react';
import Container from 'react-bootstrap/container'
import Button from 'react-bootstrap/button'
import { login, logout } from '../firebase'

const Login = () => {
    return (
        <Container>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>Logout</Button>
        </Container>
    )
}

export default Login
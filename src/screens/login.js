import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { login } from '../firebase';
import { Redirect } from 'react-router-dom';
import { useStateProviderValue } from '../StateProvider';

const Login = (props) => {
    const [{ user }] = useStateProviderValue();
    const isAuthenticated = user ? true : false;

    if (isAuthenticated) {
        return <Redirect to='/' />
    } else {
        return (
            <div>
                <Col className="justify-content-center align-self-center">
                    <h2>Welcome to Kitchen Love</h2>
                    <Button onClick={ () => login()}>Login With Facebook</Button>
                </Col>
            </div>

        )
    }
}

export default Login;
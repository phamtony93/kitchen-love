import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}



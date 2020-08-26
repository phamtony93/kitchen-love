import React from 'react';
import { Container, CardImg, Card } from 'react-bootstrap';

const Feed = () => {
    return (
        <Container>
            <Card>
                <CardImg></CardImg>
                <Card.Body>
                    <Card.Title>Welcome to Kitchen Love!</Card.Title>
                    <Card.Text>Get fed by at home chefs through Kitchen Love</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Feed
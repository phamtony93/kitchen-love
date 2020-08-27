import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'

const Contact = () => {
    return (
        <Accordion className="text-left">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">FAQ</Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ul>
                            <li>question 1</li>
                            <li>question 2</li>
                            <li>question 3</li>
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">Contact Us</Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <ul>
                            <li>Phone: (555)555-5555</li>
                            <li>Email: kitchen-love@love.com</li>
                            <li>Address: 555 Grant St. San Francisco, CA 95132</li>
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Contact
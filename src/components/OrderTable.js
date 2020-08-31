import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const OrderTable = (props) => {
    // console.log('3')
    // console.log(props)
    return (
        <Container>
            <Row>
                <Col>{props.order.orderDate}</Col>
                <Col>Total</Col>
                <Col>Order id {props.order.id}</Col>
            </Row>
        </Container>
    )
}

export default OrderTable
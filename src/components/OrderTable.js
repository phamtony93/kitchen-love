import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const OrderTable = ({order}) => {
    // console.log('3')
    // console.log(props)
    return (
        <Container>
            <Row>
                <Col>{order.orderDate}</Col>
                <Col>Total</Col>
                <Col>Order id {order.id}</Col>
            </Row>
        </Container>
    )
}

export default OrderTable
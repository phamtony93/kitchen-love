import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OrderConfirmation = (props) => {
    console.log('3')
    console.log(props.orderSubmitted)
    return (
        <Modal show={props.orderSubmitted}>
            <Modal.Body>
                Your order has been sumitted. Your order ID is {props.confirmationId}. Your food will be availale shortly.
            </Modal.Body>
            <Modal.Footer>
                <Button as={Link} to='/' onClick={() => localStorage.setItem("cart", null)}>Done</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderConfirmation
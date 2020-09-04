import React, {useState} from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { useStateProviderValue } from '../StateProvider';

const NOT_AVAILABLE = '../assets/not_available';
const ItemConfirmation = (props) => {
    let [ quantity, setQuantity ] = useState(1);
    const [{ cart }, dispatch] = useStateProviderValue();
    const incrementQuantity = () => setQuantity((prevVal) => prevVal +1);
    const decrementQuantity = () => setQuantity((prevVal) => prevVal === 1 ? 1 : prevVal -1);

    const { 
        description='Not Available', 
        item='Not Available', 
        price=0,
        imageUrl=NOT_AVAILABLE
        } = props.details ? props.details : {};

    const addToCart = () => {
        const cart = (localStorage.getItem("cart") === "null" || localStorage.getItem("cart") === null) ?  [] : JSON.parse(localStorage.getItem("cart"));
        cart.push({
            details: props.details,
            quantity: quantity
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        props.handleCloseConfirmation();
    }

    return (
        <Modal show={props.showConfirmation} onHide={() => props.handleCloseConfirmation()}>
        <Modal.Header closeButton>
          <Modal.Title>
              <Image src={imageUrl} fluid />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => decrementQuantity()}>
            -
            </Button>
            <div className="px-1">
            {quantity}   
            </div>
            <Button className="mr-auto" variant="secondary" onClick={() => incrementQuantity()}>
            +
            </Button>
            <Button variant="dark" onClick={() => addToCart()}>
            Add {quantity} to Cart ${price * quantity}
            </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ItemConfirmation
import React, { useState } from "react";
import "./ItemConfirmation.css";
import { Modal, Button, Image } from "react-bootstrap";
import { useStateProviderValue } from "../../StateProvider";
import CurrencyFormat from "react-currency-format";

const NOT_AVAILABLE = "../assets/not_available";
const ItemConfirmation = ({
  details,
  handleCloseConfirmation,
  setItemIdToConfirm,
  showConfirmation,
}) => {
  let [quantity, setQuantity] = useState(1);
  const [{ cart }, dispatch] = useStateProviderValue();
  const incrementQuantity = () => setQuantity((prevVal) => prevVal + 1);
  const decrementQuantity = () =>
    setQuantity((prevVal) => (prevVal === 1 ? 1 : prevVal - 1));

  const {
    description = "Not Available",
    item = "Not Available",
    price = 0,
    imageUrl = NOT_AVAILABLE,
  } = details ? details : {};

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        skuId: details.skuId,
        description: details.description,
        item: details.name,
        price: details.price,
        imageUrl: details.imageUrl,
        quantity: quantity,
      },
    });

    const cart =
      localStorage.getItem("cart") === "null" ||
      localStorage.getItem("cart") === null
        ? []
        : JSON.parse(localStorage.getItem("cart"));
    cart.push({
      details: details,
      quantity: quantity,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    handleCloseConfirmation();
  };

  console.log("details >>>>>", details);

  return (
    <Modal show={showConfirmation} onHide={() => handleCloseConfirmation()}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Image src={imageUrl} fluid className="itemConfirmation__image" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => decrementQuantity()}>
          -
        </Button>
        <div className="px-1">{quantity}</div>
        <Button
          className="mr-auto"
          variant="secondary"
          onClick={() => incrementQuantity()}
        >
          +
        </Button>
        <Button variant="dark" onClick={() => addToCart()}>
          Add {quantity} to Cart{" "}
          <CurrencyFormat
            value={price * quantity}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"$"}
            displayType={"text"}
          />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemConfirmation;

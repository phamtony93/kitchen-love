import React, { useState } from "react";
import { Table, Image, Button, Alert } from "react-bootstrap";
import { createOrder } from "../firebase";
import OrderConfirmation from "../components/OrderConfirmation";
import CheckoutProduct from "../components/CheckoutProduct/CheckoutProduct";
import { useStateProviderValue } from "../StateProvider";
import Subtotal from "../components/Subtotal/Subtotal";

const TAX_RATE = 0.0875;

const Cart = () => {
  const [{ cart }, dispatch] = useStateProviderValue();
  let [orderSubmitted, setOrderSubmitted] = useState(false);

  const isEmptyCart = localStorage.getItem("cart") === "null" ? true : false;

  //Use table for now, create custom component for better visuals
  const convertToTableRow = (cart) => {
    if (cart === null) return null;
    return cart.map((item) => {
      return (
        <tr>
          <td>
            <Image
              src={item.details.imageUrl}
              rounded
              style={{ width: "30%", height: "auto" }}
            />
          </td>
          <td>{item.details.name}</td>
          <td>{item.quantity}</td>
          <td>{item.quantity * item.details.price}</td>
        </tr>
      );
    });
  };

  const calculateSubtotal = (cart) => {
    if (cart === null) return 0;
    return cart.reduce(
      (total, item) => (total += item.quantity * item.details.price),
      0
    );
  };

  const submitOrder = () => {
    //process cart as an array of itemID and quantity
    let cartData = {};
    cartData["customerId"] = localStorage.getItem("uid");
    cartData["order"] = cart.map((item) => {
      return {
        itemId: item.details.id,
        quantity: item.quantity,
      };
    });
    //Add current date time
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    cartData["orderDate"] = date;
    createOrder(cartData, setOrderSubmitted);
  };

  return (
    <div className="cart">
      <div className="cart__items">
        {cart.length === 0 ? (
          <h2>Your cart is empty. Add some food to your cart and stomache..</h2>
        ) : null}
        {cart?.map((item) => (
          <CheckoutProduct details={item} />
        ))}
      </div>
      <div className="cart__subtotal">
        <Subtotal />
      </div>

      {/* <Table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Item</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    {convertToTableRow(cart)}
                </Table>
                <div className="justify-contents-end">
                    <h4>Subtotal {subTotal}</h4><br/>
                    <h4>Taxes {taxes}</h4><br/>
                    <h4>Total {total}</h4>
                </div>
                <Button onClick={() => submitOrder()}>Submit Order</Button>
                <OrderConfirmation orderSubmitted={orderSubmitted} confirmationId={'123'}/> */}
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { createOrder } from "../firebase";
import { Link } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import CheckoutProduct from "../components/CheckoutProduct/CheckoutProduct";
import { useStateProviderValue } from "../StateProvider";
import Subtotal from "../components/Subtotal/Subtotal";

const TAX_RATE = 0.0875;

const Cart = () => {
  const [{ cart }, dispatch] = useStateProviderValue();
  let [orderSubmitted, setOrderSubmitted] = useState(false);

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
        ) : (
          <h2>Review your cart</h2>
        )}
        {cart?.map((item) => (
          <CheckoutProduct details={item} />
        ))}
      </div>
      {cart.length === 0 ? null : (
        <div className="cart__subtotal">
          <Subtotal />
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;

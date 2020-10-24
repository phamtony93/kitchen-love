import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useStateProviderValue } from "../../StateProvider";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import axios from "../../axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getCartTotal } from "../../reducer";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../firebase";

const Checkout = () => {
  const history = useHistory();
  const [{ cart, user }, dispatch] = useStateProviderValue();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .post("/create-payment-intent", {
        total: getCartTotal(cart) * 100,
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [cart]);

  const handleChange = (e) => {
    console.log(e.empty);
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    //need to do stripe stuff
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
    } else {
      const { paymentIntent } = payload;
      // log to firebase
      createOrder({
        // optional chaining as a safety measure
        customerId: user?.uid,
        order: cart,
        orderDate: paymentIntent.created,
        // concert payment intent back from cents to dollars
        amount: paymentIntent.amount / 100,
      });

      //Clear basket
      dispatch({
        type: "EMPTY_CART",
      });

      //Update stripe state
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("success!");

      history.push("/order-history");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__section">
        <div className="checkout__sectionLeft">
          <h3>Address</h3>
        </div>
        <div className="checkout__sectionRight">
          <span>{user?.email}</span>
          <span>123 Fake Street</span>
          <span>San Jose CA, 95555</span>
        </div>
      </div>
      <div className="checkout__section">
        <div className="checkout__sectionLeft">
          <h3>Your Cart</h3>
        </div>
        <div className="checkout__sectionRight">
          {cart.map((item) => {
            return <CheckoutProduct details={item} hideButton={true} />;
          })}
        </div>
      </div>
      <div className="checkout__section">
        <div className="checkout__sectionLeft">
          <h3>Payment</h3>
        </div>
        <div className="checkout__sectionRight">
          <form onSubmit={handleSubmit}>
            <CardElement id="card-element" onChange={handleChange} />
            <button disabled={processing || disabled || succeeded}>
              Submit Payment!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

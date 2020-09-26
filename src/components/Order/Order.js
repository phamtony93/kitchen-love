import React from "react";
import "./Order.css";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Check } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";

const Order = ({ orderDetails: { id, amount, order, orderDate } }) => {
  console.log(order);
  return (
    <div className="order">
      <div className="order__info">
        <span>
          <strong>Order Date: </strong>
          {orderDate}
        </span>
        <span>
          <strong>Total: </strong>
          <CurrencyFormat
            value={amount}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"$"}
            displayType="text"
          />
        </span>
        <span>
          <strong>ID: </strong>
          {id}
        </span>
      </div>
      <div className="order__items">
        {order.map((item) => {
          return <CheckoutProduct details={item} />;
        })}
      </div>
    </div>
  );
};

export default Order;

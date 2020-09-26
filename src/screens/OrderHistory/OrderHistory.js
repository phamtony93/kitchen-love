import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getOrderHistory } from "../../firebase";
import OrderTable from "../../components/OrderTable";
import Order from "../../components/Order/Order";
import { useStateProviderValue } from "../../StateProvider";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [{ user }, dispatch] = useStateProviderValue();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getOrderHistory(user.uid);
      setOrderHistory(orders);
      return orders;
    };

    getOrders();
  }, []);

  console.log(orderHistory);

  return (
    <div className="orderHistory">
      <h3>Your order history</h3>
      {orderHistory.map((order) => {
        console.log(order);
        return <Order orderDetails={order} />;
      })}
    </div>
  );
};

export default OrderHistory;

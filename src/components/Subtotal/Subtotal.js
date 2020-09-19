import React from "react";
import "./Subtotal.css";
import { getCartTotal } from "../../reducer";
import { useStateProviderValue } from "../../StateProvider";

const TAX_RATE = 0.875;

function Subtotal() {
  const [{ cart }, dispatch] = useStateProviderValue();
  const subtotal = getCartTotal(cart);
  const taxes = subtotal * TAX_RATE;
  return (
    <div className="subtotal">
      <span>
        <strong>Subtotal: </strong>
        {subtotal}{" "}
      </span>
      <span>
        <stron>Taxes: </stron>
        {taxes}
      </span>
      <span>
        <stron>Total: </stron>
        {subtotal + taxes}
      </span>
    </div>
  );
}

export default Subtotal;

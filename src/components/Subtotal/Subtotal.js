import React from "react";
import "./Subtotal.css";
import { getCartTotal } from "../../reducer";
import { useStateProviderValue } from "../../StateProvider";
import CurrencyFormat from "react-currency-format";

const TAX_RATE = 0.875;

function Subtotal() {
  const [{ cart }, dispatch] = useStateProviderValue();
  const subtotal = getCartTotal(cart);
  const taxes = subtotal * TAX_RATE;
  return (
    <div className="subtotal">
      <span>
        <strong>Subtotal: </strong>
        <CurrencyFormat
          value={subtotal}
          decimalScale={2}
          prefix={"$"}
          displayType="text"
        />
      </span>
      <span>
        <strong>Taxes: </strong>
        <CurrencyFormat
          value={taxes}
          decimalScale={2}
          prefix={"$"}
          displayType="text"
        />
      </span>
      <span>
        <strong>Total: </strong>
        <CurrencyFormat
          value={subtotal + taxes}
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={"$"}
          displayType="text"
        />
      </span>
    </div>
  );
}

export default Subtotal;

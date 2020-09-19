import React from "react";
import "./CheckoutProduct.css";
import { useStateProviderValue } from "../../StateProvider";

function CheckoutProduct({ details }) {
  const [{ cart }, dispatch] = useStateProviderValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      skuId: details.skuId,
      quantity: details.quantity,
    });
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__left">
        <img src={details.imageUrl} alt="" className="checkoutProduct__image" />
      </div>
      <div className="checkoutProduct__right">
        <div className="checkoutProduct__infoItemName">
          <span>
            <strong>Item:</strong> {details.name}
          </span>
        </div>
        <div className="checkoutProduct__infoPrice">
          <span>
            <strong>Price:</strong> {details.price}
          </span>
        </div>
        <div className="checkoutProduct__infoQuantity">
          <span>
            <strong>Quantity:</strong> {details.quantity}
          </span>
        </div>
        <button
          className="checkoutProduct__removeButton"
          onClick={removeFromCart}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

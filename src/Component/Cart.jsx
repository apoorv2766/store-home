import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Component/Css.css/Header.css";
import { cart } from "../Context/CartContext";

const Cart = () => {
  const { cartData, removeHandler, updateQuantity, removeAll } = useContext(cart);

  const total = cartData.reduce((sum, e) => sum + e.Price * (e.quantity || 1), 0);

  return cartData.length === 0 ? (
    <h1 className="p-5" style={{ height: "80vh" }}>No item in the cart...</h1>
  ) : (
    <div className="bg-white h-100">
      <div className="d-flex justify-content-evenly w-100 p-3 fs-5 fw-bold border-bottom">
        <span style={{ width: "40%" }}>Item</span>
        <span style={{ width: "20%", textAlign: "center" }}>Qty</span>
        <span style={{ width: "20%", textAlign: "center" }}>Price</span>
        <span style={{ width: "20%", textAlign: "center" }}>Remove</span>
      </div>

      {cartData.map((e, i) => {
        const { img, id, Price, tittle, quantity = 1 } = e;
        return (
          <div key={i} className="d-flex justify-content-evenly align-items-center py-3 border-bottom">
            <div style={{ width: "40%", display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={img} alt={tittle} className="img-fluid" style={{ height: "80px", objectFit: "contain" }} />
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>{tittle}</p>
            </div>

            <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
              <button
                className="btn btn-sm btn-outline-secondary px-2 py-0"
                onClick={() => updateQuantity(id, quantity - 1)}
              >−</button>
              <span className="fw-bold">{quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary px-2 py-0"
                onClick={() => updateQuantity(id, quantity + 1)}
              >+</button>
            </div>

            <span style={{ width: "20%", textAlign: "center" }}>
              ₹{(Price * quantity).toLocaleString()}
            </span>

            <div style={{ width: "20%", textAlign: "center" }}>
              <button className="btn btn-danger btn-sm" onClick={() => removeHandler(id)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <hr />
      <div className="d-flex justify-content-between align-items-center px-4 pb-4">
        <h5 className="mb-0">Total: <strong>₹{total.toLocaleString()}</strong></h5>
        <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={removeAll}>Clear Cart</button>
          <Link to="/Checkout" className="btn btn-success">Proceed to Checkout →</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Checkout = () => {
  const { cartData, removeAll } = useContext(cart);
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const total = cartData.reduce((sum, e) => sum + e.Price * (e.quantity || 1), 0);

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h3>Please <Link to="/Login">login</Link> to checkout.</h3>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h3>Your cart is empty. <Link to="/Product">Keep shopping</Link></h3>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/orders/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to place order");
      }
      const order = await res.json();
      removeAll(); // clear local cart state
      navigate(`/Orders/${order.id}`, { state: { order, justPlaced: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh", maxWidth: "700px" }}>
      <h2 className="mb-4">Checkout</h2>

      <div className="card p-3 mb-4">
        {cartData.map((e, i) => (
          <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <img src={e.img} alt={e.tittle} style={{ height: "60px", width: "60px", objectFit: "contain" }} />
              <div>
                <p className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>{e.tittle}</p>
                <small className="text-muted">Qty: {e.quantity || 1}</small>
              </div>
            </div>
            <span className="fw-bold">₹{(e.Price * (e.quantity || 1)).toLocaleString()}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between mt-3 fs-5 fw-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex gap-3">
        <Link to="/Cart" className="btn btn-outline-secondary flex-fill">← Back to Cart</Link>
        <button
          className="btn btn-success flex-fill"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? "Placing Order…" : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

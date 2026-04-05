import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// ── Single order detail view ──────────────────────────────────────────────────
function OrderDetail({ orderId, token }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // If navigated from checkout with pre-loaded order data, use it
    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [orderId, token, location.state]);

  if (loading) return <p className="p-4">Loading order…</p>;
  if (!order) return <p className="p-4">Order not found.</p>;

  const justPlaced = location.state?.justPlaced;

  return (
    <div className="container py-5" style={{ minHeight: "80vh", maxWidth: "700px" }}>
      {justPlaced && (
        <div className="alert alert-success mb-4">
          🎉 Order placed successfully! Your order ID is <strong>#{order.id}</strong>.
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Order #{order.id}</h2>
        <Link to="/Orders" className="btn btn-outline-secondary btn-sm">← All Orders</Link>
      </div>

      <p className="text-muted mb-1">
        Placed on: {new Date(order.created_at).toLocaleString()}
      </p>
      <p className="mb-3">
        Status:{" "}
        <span className={`badge bg-${order.status === "placed" ? "primary" : "success"}`}>
          {order.status}
        </span>
      </p>

      <div className="card p-3 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <img src={item.image_url} alt={item.title} style={{ height: "60px", width: "60px", objectFit: "contain" }} />
              <div>
                <p className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>{item.title}</p>
                <small className="text-muted">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</small>
              </div>
            </div>
            <span className="fw-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between mt-3 fs-5 fw-bold">
          <span>Total</span>
          <span>₹{order.total.toLocaleString()}</span>
        </div>
      </div>

      <Link to="/Product" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );
}

// ── Orders list view ──────────────────────────────────────────────────────────
function OrdersList({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/orders/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="p-4">Loading orders…</p>;

  return (
    <div className="container py-5" style={{ minHeight: "80vh", maxWidth: "800px" }}>
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">You haven't placed any orders yet.</p>
          <Link to="/Product" className="btn btn-primary mt-2">Start Shopping</Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div key={order.id} className="card p-3">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h5 className="mb-1">Order #{order.id}</h5>
                  <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                  <span className={`badge bg-${order.status === "placed" ? "primary" : "success"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-end">
                  <p className="fw-bold fs-5 mb-1">₹{order.total.toLocaleString()}</p>
                  <small className="text-muted">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</small>
                </div>
              </div>

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {order.items.slice(0, 4).map((item, i) => (
                  <img key={i} src={item.image_url} alt={item.title} title={item.title}
                    style={{ height: "50px", width: "50px", objectFit: "contain", border: "1px solid #eee", borderRadius: "4px" }} />
                ))}
                {order.items.length > 4 && (
                  <span className="d-flex align-items-center text-muted" style={{ fontSize: "0.85rem" }}>
                    +{order.items.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-3">
                <Link to={`/Orders/${order.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Route-aware wrapper ───────────────────────────────────────────────────────
const Orders = () => {
  const { orderId } = useParams();
  const { token, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h3>Please <Link to="/Login">login</Link> to view your orders.</h3>
      </div>
    );
  }

  return orderId
    ? <OrderDetail orderId={orderId} token={token} />
    : <OrdersList token={token} />;
};

export default Orders;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useWindowWidth } from "../hooks/useWindowWidth";

const qtyBtn = {
  width: "30px", height: "30px", borderRadius: "8px",
  border: "1.5px solid #e0e0e0", background: "#fff",
  fontWeight: 700, cursor: "pointer", fontSize: "1rem",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const Cart = () => {
  const { cartData, removeHandler, updateQuantity, removeAll } = useContext(cart);
  const w = useWindowWidth();
  const isMobile = w < 640;

  const total = cartData.reduce((sum, e) => sum + e.Price * (e.quantity || 1), 0);
  const itemCount = cartData.reduce((sum, e) => sum + (e.quantity || 1), 0);

  if (cartData.length === 0) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "70vh", backgroundColor: "#f0f2f5", gap: "16px",
      }}>
        <div style={{ fontSize: "4rem" }}>&#128722;</div>
        <h2 style={{ color: "#1a1a2e", margin: 0 }}>Your cart is empty</h2>
        <p style={{ color: "#888", margin: 0 }}>Add some products to get started</p>
        <Link to="/Product" style={{
          padding: "12px 32px", borderRadius: "24px",
          background: "linear-gradient(135deg,#f7971e,#ffd200)",
          color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
          boxShadow: "0 4px 18px rgba(247,151,30,.35)",
        }}>Browse Products &#8594;</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", padding: isMobile ? "16px 12px" : "32px 24px" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.6rem", color: "#1a1a2e" }}>
            &#128722; Shopping Cart
          </h2>
          <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg,#f7971e,transparent)" }} />
          <span style={{ color: "#888", fontSize: "0.88rem", whiteSpace: "nowrap" }}>
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
          gap: "20px", alignItems: "start",
        }}>

          {/* ── Items list ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cartData.map((e) => {
              const { img, id, Price, tittle, quantity = 1 } = e;
              return (
                <div key={id} style={{
                  background: "#fff", borderRadius: "14px", padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: "14px",
                  boxShadow: "0 2px 10px rgba(0,0,0,.07)",
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    flexShrink: 0, width: isMobile ? "68px" : "88px", height: isMobile ? "68px" : "88px",
                    background: "#f8f9fa", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img src={img} alt={tittle} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />
                  </div>

                  {/* Title + price */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: "0 0 6px", fontWeight: 600, color: "#1a1a2e",
                      fontSize: isMobile ? "0.8rem" : "0.92rem",
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>{tittle}</p>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: "1.1rem", color: "#e52d27" }}>
                      &#8377;{(Price * quantity).toLocaleString("en-IN")}
                    </p>
                    {!isMobile && (
                      <p style={{ margin: "3px 0 0", fontSize: "0.78rem", color: "#aaa" }}>
                        &#8377;{Price.toLocaleString("en-IN")} each
                      </p>
                    )}
                  </div>

                  {/* Qty + remove */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button style={qtyBtn}
                        onClick={() => { updateQuantity(id, quantity - 1); if (quantity - 1 > 0) toast("Quantity updated", { icon: "&#9998;" }); }}
                      >&#8722;</button>
                      <span style={{ minWidth: "22px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>{quantity}</span>
                      <button style={qtyBtn}
                        onClick={() => { updateQuantity(id, quantity + 1); toast("Quantity updated", { icon: "&#9998;" }); }}
                      >&#43;</button>
                    </div>
                    <button
                      onClick={() => { removeHandler(id); toast.error("Item removed"); }}
                      style={{
                        padding: "4px 14px", borderRadius: "8px", border: "none",
                        background: "#fff0f0", color: "#e52d27",
                        fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                      }}
                    >Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Order summary ── */}
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,.07)",
            position: isMobile ? "static" : "sticky", top: "80px",
          }}>
            <h3 style={{ margin: "0 0 20px", fontWeight: 800, color: "#1a1a2e", fontSize: "1.1rem" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#555", fontSize: "0.9rem" }}>
              <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
              <span>&#8377;{total.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#555", fontSize: "0.9rem" }}>
              <span>Delivery</span>
              <span style={{ color: "#27ae60", fontWeight: 600 }}>FREE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#555", fontSize: "0.9rem" }}>
              <span>Tax (18% GST)</span>
              <span>&#8377;{Math.round(total * 0.18).toLocaleString("en-IN")}</span>
            </div>

            <hr style={{ border: "none", borderTop: "1.5px solid #f0f2f5", margin: "16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px", fontWeight: 800, fontSize: "1.2rem", color: "#1a1a2e" }}>
              <span>Total</span>
              <span style={{ color: "#e52d27" }}>&#8377;{Math.round(total * 1.18).toLocaleString("en-IN")}</span>
            </div>

            <Link to="/Checkout" style={{
              display: "block", textAlign: "center", padding: "13px",
              background: "linear-gradient(135deg,#f7971e,#ffd200)",
              color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
              borderRadius: "12px", fontSize: "1rem",
              boxShadow: "0 4px 18px rgba(247,151,30,.35)",
            }}>
              Proceed to Checkout &#8594;
            </Link>

            <button
              onClick={() => { removeAll(); toast.error("Cart cleared!"); }}
              style={{
                width: "100%", marginTop: "10px", padding: "11px", borderRadius: "12px",
                border: "1.5px solid #ffcccc", background: "#fff5f5",
                color: "#e52d27", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem",
              }}
            >Clear Cart</button>

            <Link to="/Product" style={{
              display: "block", textAlign: "center", marginTop: "12px",
              color: "#888", fontSize: "0.82rem", textDecoration: "none",
            }}>
              &#8592; Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

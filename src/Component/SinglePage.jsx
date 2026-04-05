import React, { useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../App";
import { cart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import { hov } from "../utils/hov";
import { useWindowWidth } from "../hooks/useWindowWidth";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item } = useContext(ProductContext);
  const { addToCart } = useContext(cart);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 960;

  const arrfil = item.find((e) => e.id === Number(id));

  if (!arrfil) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "60vh", backgroundColor: "#f0f2f5",
      }}>
        <div style={{ fontSize: "3rem" }}>&#128270;</div>
        <h3 style={{ color: "#1a1a2e", marginTop: "12px" }}>Product not found</h3>
        <Link to="/Product" style={{
          marginTop: "16px", padding: "10px 28px", borderRadius: "24px",
          background: "linear-gradient(135deg,#f7971e,#ffd200)",
          color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
        }}>Browse Products</Link>
      </div>
    );
  }

  const { img, P_name, Price, Rating, Category, tittle } = arrfil;
  const wishlisted = isWishlisted(arrfil.id);

  /* Related: same category, exclude current */
  const related = item.filter((p) => p.Category === Category && p.id !== arrfil.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      {/* Breadcrumb bar */}
      <div style={{
        background: "linear-gradient(90deg,#1a1a2e,#16213e)",
        padding: isMobile ? "10px 16px" : "12px 32px",
        display: "flex", alignItems: "center", gap: "8px",
        fontSize: "0.82rem", flexWrap: "wrap",
      }}>
        <Link to="/"      style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Home</Link>
        <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
        <Link to="/Product" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Products</Link>
        <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
        <span style={{ color: "#ffd200", fontWeight: 600 }}>{Category}</span>
      </div>

      {/* Main card */}
      <div style={{ maxWidth: "1100px", margin: isMobile ? "16px auto" : "32px auto", padding: isMobile ? "0 12px" : "0 20px" }}>
        <div style={{
          background: "#fff", borderRadius: isMobile ? "14px" : "20px",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr",
          overflow: "hidden",
        }}>

          {/* Left — image panel */}
          <div style={{
            background: "#f8f9fa", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: isMobile ? "24px 20px" : "40px",
            position: "relative",
            borderBottom: (isMobile || isTablet) ? "1px solid #f0f2f5" : "none",
          }}>
            {/* Wishlist button */}
            <button
              onClick={() => {
                const was = wishlisted;
                toggleWishlist(arrfil.id);
                was
                  ? toast("Removed from wishlist", { icon: "🤍" })
                  : toast.success("Added to wishlist!");
              }}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "#fff", border: "none", borderRadius: "50%",
                width: "42px", height: "42px", fontSize: "1.3rem",
                boxShadow: "0 2px 8px rgba(0,0,0,.15)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlisted ? "❤️" : "🤍"}
            </button>

            <img
              src={img}
              alt={tittle}
              style={{ maxWidth: "100%", maxHeight: isMobile ? "220px" : "340px", objectFit: "contain" }}
            />

            {/* Category badge */}
            <span style={{
              marginTop: "24px", background: "linear-gradient(135deg,#667eea,#764ba2)",
              color: "#fff", borderRadius: "20px", padding: "5px 18px",
              fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.5px",
            }}>
              {Category}
            </span>
          </div>

          {/* Right — info panel */}
          <div style={{ padding: isMobile ? "20px 18px 24px" : isTablet ? "28px 32px" : "40px 44px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Brand */}
            <p style={{
              margin: 0, fontSize: "0.78rem", fontWeight: 700,
              color: "#aaa", textTransform: "uppercase", letterSpacing: "1px",
            }}>{P_name}</p>

            {/* Title */}
            <h1 style={{ margin: 0, fontSize: isMobile ? "1.15rem" : "1.4rem", fontWeight: 800, color: "#1a1a2e", lineHeight: 1.35 }}>
              {tittle}
            </h1>

            {/* Rating */}
            <StarRating value={Rating} size="1.4rem" />

            {/* Divider */}
            <div style={{ height: "1px", background: "#f0f0f0" }} />

            {/* Price */}
            <div>
              <span style={{ fontSize: "0.8rem", color: "#aaa", display: "block", marginBottom: "4px" }}>Price</span>
              <span style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e52d27" }}>
                &#8377;{Price?.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Qty picker */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "0.85rem", color: "#555", fontWeight: 600 }}>Quantity</span>
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                border: "1.5px solid #e0e0e0", borderRadius: "10px", overflow: "hidden",
              }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: "38px", height: "38px", border: "none", background: "#f8f9fa",
                    fontSize: "1.2rem", cursor: "pointer", color: "#555",
                    borderRight: "1.5px solid #e0e0e0",
                  }}
                >&#8722;</button>
                <span style={{
                  width: "44px", textAlign: "center",
                  fontWeight: 700, fontSize: "1rem", color: "#1a1a2e",
                }}>{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    width: "38px", height: "38px", border: "none", background: "#f8f9fa",
                    fontSize: "1.2rem", cursor: "pointer", color: "#555",
                    borderLeft: "1.5px solid #e0e0e0",
                  }}
                >&#43;</button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#f0f0f0" }} />

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
              <button
                onClick={() => { addToCart({ ...arrfil, quantity: qty }); toast.success(`${qty}x added to cart!`); navigate("/Cart"); }}
                style={{
                  flex: 1, padding: "14px", border: "none", borderRadius: "10px",
                  background: "linear-gradient(135deg,#f7971e,#ffd200)",
                  color: "#1a1a1a", fontWeight: 700, fontSize: "1rem",
                  cursor: "pointer", transition: "opacity .15s",
                }}
                {...hov({ opacity: "0.85" }, { opacity: "1" })}
              >
                &#128722; Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart({ ...arrfil, quantity: qty });
                  if (!wishlisted) toggleWishlist(arrfil.id);
                  toast.success("Added to cart & wishlist!");
                }}
                style={{
                  flex: 1, padding: "14px", border: "2px solid #1a1a2e", borderRadius: "10px",
                  background: "#1a1a2e", color: "#fff",
                  fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "opacity .15s",
                }}
                {...hov({ opacity: "0.8" }, { opacity: "1" })}
              >
                &#10084; Add to Wishlist & Cart
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
              {["&#128666; Free Delivery", "&#128260; Easy Returns", "&#128274; Secure Payment"].map((b) => (
                <span key={b} style={{
                  fontSize: "0.72rem", color: "#666", display: "flex",
                  alignItems: "center", gap: "4px",
                }} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1.3rem", color: "#1a1a2e" }}>
                More in {Category}
              </h2>
              <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg,#f7971e,transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? "12px" : "16px" }}>
              {related.map((p) => (
                <Link key={p.id} to={`/singlepage/${p.id}`} style={{ textDecoration: "none" }}
                  onClick={() => setQty(1)}
                >
                  <div style={{
                    background: "#fff", borderRadius: "14px", overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                    transition: "transform .2s,box-shadow .2s",
                  }}
                    {...hov(
                      { transform: "translateY(-4px)", boxShadow: "0 10px 24px rgba(0,0,0,.13)" },
                      { transform: "translateY(0)",    boxShadow: "0 2px 8px rgba(0,0,0,.07)" }
                    )}
                  >
                    <img src={p.img} alt={p.tittle} style={{
                      width: "100%", height: "140px", objectFit: "contain",
                      background: "#f8f9fa", padding: "12px",
                    }} />
                    <div style={{ padding: "10px 12px 14px" }}>
                      <p style={{ margin: "0 0 4px", fontSize: "0.68rem", color: "#aaa", fontWeight: 600 }}>{p.P_name}</p>
                      <p style={{
                        margin: "0 0 6px", fontSize: "0.83rem", fontWeight: 700, color: "#1a1a2e",
                        overflow: "hidden", display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      }}>{p.tittle}</p>
                      <span style={{ fontWeight: 800, color: "#e52d27", fontSize: "0.95rem" }}>
                        &#8377;{p.Price?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePage;


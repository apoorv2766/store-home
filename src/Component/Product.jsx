import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
import { cart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import Category from "./Category";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useWindowWidth } from "../hooks/useWindowWidth";
import StarRating from "./StarRating";
import { hov } from "../utils/hov";

const SIDEBAR_W = 220;

const Product = () => {
  const { addToCart } = useContext(cart);
  const { item, arrResult, loading } = useContext(ProductContext);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const w = useWindowWidth();
  const isMobile = w < 960;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close drawer when switching to desktop
  useEffect(() => { if (!isMobile) setDrawerOpen(false); }, [isMobile]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", backgroundColor: "#f0f2f5" }}>
        <ClipLoader color="#e52d27" size={60} />
      </div>
    );
  }

  const sidebarContent = (
    <div style={{
      width: `${SIDEBAR_W}px`, height: "100%",
      background: "linear-gradient(180deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
      overflowY: "auto", boxShadow: "4px 0 20px rgba(0,0,0,.25)",
      paddingTop: isMobile ? "16px" : "70px",
    }}>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 12px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ color: "#ffd200", fontWeight: 800, fontSize: "1rem" }}>&#127855; Filters</span>
          <button onClick={() => setDrawerOpen(false)} style={{
            background: "rgba(255,255,255,.1)", border: "none", borderRadius: "8px",
            color: "#fff", width: "32px", height: "32px", cursor: "pointer", fontSize: "1.1rem",
          }}>&#10005;</button>
        </div>
      )}
      <Category />
    </div>
  );

  return (
    <div style={{ display: "flex", width: "100%", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      {/* Desktop sidebar (fixed) */}
      {!isMobile && (
        <div style={{
          position: "fixed", left: 0, top: 0, width: `${SIDEBAR_W}px`, height: "100vh", zIndex: 100,
          transform: sidebarCollapsed ? `translateX(-${SIDEBAR_W}px)` : "translateX(0)",
          transition: "transform .3s ease",
        }}>
          {sidebarContent}
        </div>
      )}

      {/* Desktop collapse/expand arrow button */}
      {!isMobile && (
        <button
          onClick={() => setSidebarCollapsed(c => !c)}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            position: "fixed",
            left: sidebarCollapsed ? 0 : `${SIDEBAR_W - 14}px`,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 101,
            width: "26px", height: "52px",
            background: "linear-gradient(135deg,#f7971e,#ffd200)",
            border: "none",
            borderRadius: sidebarCollapsed ? "0 10px 10px 0" : "10px 0 0 10px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", color: "#1a1a2e", fontWeight: 900,
            boxShadow: "2px 2px 10px rgba(0,0,0,.25)",
            transition: "left .3s ease, border-radius .3s ease",
          }}
        >
          {sidebarCollapsed ? "\u25B6" : "\u25C0"}
        </button>
      )}

      {/* â”€â”€ Mobile drawer overlay â”€â”€ */}
      {isMobile && drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,.55)",
              zIndex: 200, backdropFilter: "blur(2px)",
            }}
          />
          {/* Drawer */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: `${SIDEBAR_W}px`, height: "100vh",
            zIndex: 201, overflowY: "auto",
          }}>
            {sidebarContent}
          </div>
        </>
      )}

      {/* Main content */}
      <div style={{
        marginLeft: isMobile ? 0 : (sidebarCollapsed ? 0 : `${SIDEBAR_W}px`),
        flex: 1, padding: isMobile ? "16px 12px" : "28px 24px",
        transition: "margin-left .3s ease",
      }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          {/* Filter toggle (mobile only) */}
          {isMobile && (
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "9px 16px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg,#1a1a2e,#16213e)",
                color: "#ffd200", fontWeight: 700, fontSize: "0.88rem",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.2)",
              }}
            >
              &#9776; Filters & Sort
            </button>
          )}
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.5rem", color: "#1a1a2e" }}>
            All Products
          </h2>
          <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg,#f7971e,transparent)" }} />
          <span style={{ color: "#888", fontSize: "0.88rem", whiteSpace: "nowrap" }}>{arrResult.length} items</span>
        </div>

        {item.length === 0 && (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "#fff", borderRadius: "16px", color: "#888",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>&#128269;</div>
            <h3 style={{ color: "#1a1a2e" }}>No products found</h3>
            <p>Try a different search or category</p>
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(auto-fill, minmax(220px, 1fr))",
          gap: isMobile ? "12px" : "20px",
        }}>
          {arrResult.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff", borderRadius: "14px", overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)", display: "flex",
                flexDirection: "column", position: "relative",
                transition: "transform .2s, box-shadow .2s",
              }}
              {...hov(
                { transform: "translateY(-4px)", boxShadow: "0 10px 28px rgba(0,0,0,.14)" },
                { transform: "translateY(0)",    boxShadow: "0 2px 10px rgba(0,0,0,.08)" }
              )}
            >
              {/* Wishlist button */}
              <button
                onClick={() => {
                  const was = isWishlisted(product.id);
                  toggleWishlist(product.id);
                  was
                    ? toast("Removed from wishlist", { icon: "\uD83E\uDD0D" })
                    : toast("Added to wishlist!",    { icon: "\u2764\uFE0F" });
                }}
                style={{
                  position: "absolute", top: "10px", right: "10px",
                  background: "rgba(255,255,255,.85)", border: "none", borderRadius: "50%",
                  width: "34px", height: "34px", cursor: "pointer",
                  fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,.15)", zIndex: 1,
                }}
                title={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted(product.id) ? "\u2764\uFE0F" : "\uD83E\uDD0D"}
              </button>

              {/* Image */}
              <Link to={`/singlepage/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#f8f9fa", padding: "16px", textAlign: "center" }}>
                  <img
                    src={product.img}
                    alt={product.tittle}
                    loading="lazy"
                    style={{ width: "100%", height: isMobile ? "120px" : "160px", objectFit: "contain" }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "10px 12px 8px" }}>
                  <p style={{ margin: "0 0 3px", fontSize: "0.65rem", color: "#aaa", fontWeight: 600, textTransform: "uppercase" }}>
                    {product.P_name}
                  </p>
                  <p style={{
                    margin: "0 0 5px", fontWeight: 700,
                    fontSize: isMobile ? "0.78rem" : "0.88rem", color: "#1a1a2e",
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  }}>
                    {product.tittle}
                  </p>
                  {!isMobile && <StarRating value={product.Rating} />}
                  <p style={{ margin: "6px 0 0", fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 800, color: "#e52d27" }}>
                    &#8377;{product.Price?.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>

              {/* Add to cart */}
              <div style={{ padding: "0 12px 12px", marginTop: "auto" }}>
                <button
                  onClick={() => { addToCart(product); toast.success("Added to cart!"); }}
                  style={{
                    width: "100%", padding: isMobile ? "8px" : "10px", border: "none", borderRadius: "8px",
                    background: "linear-gradient(135deg,#f7971e,#ffd200)",
                    color: "#1a1a1a", fontWeight: 700, fontSize: isMobile ? "0.78rem" : "0.88rem",
                    cursor: "pointer", transition: "opacity .15s",
                  }}
                  {...hov({ opacity: "0.85" }, { opacity: "1" })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

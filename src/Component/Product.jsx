import React, { useContext } from "react";
import "../Component/Css.css/Header.css";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
import { cart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import Category from "./Category";
import { ClipLoader } from "react-spinners";

// Renders filled/half/empty stars for a 0–5 rating
function StarRating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<span key={i} style={{ color: "#f5a623" }}>★</span>);
    } else if (value >= i - 0.5) {
      stars.push(<span key={i} style={{ color: "#f5a623" }}>½</span>);
    } else {
      stars.push(<span key={i} style={{ color: "#ccc" }}>★</span>);
    }
  }
  return <span style={{ fontSize: "1rem" }}>{stars} <small style={{ color: "#888" }}>({value})</small></span>;
}

const Product = () => {
  const { addToCart } = useContext(cart);
  const { item, arrResult, loading } = useContext(ProductContext);
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <ClipLoader color="#f5a623" size={60} />
      </div>
    );
  }

  return (
    <div className="d-flex w-100">
      <div style={{ position: "fixed", left: "0", width: "15%" }}>
        <Category />
      </div>

      <div style={{ position: "relative", left: "15%", width: "85%" }}>
        {item.length === 0 && (
          <div className="container m-3 p-1" style={{ height: "80vh" }}>
            <h2>No such match found!!!</h2>
          </div>
        )}
        <div className="d-flex flex-wrap gap-3 m-lg-4">
          {arrResult.map((product, i) => (
            <div key={i} className="card" style={{ width: "17rem", padding: "1rem", position: "relative" }}>
              {/* Wishlist heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  position: "absolute", top: "8px", right: "8px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "1.4rem", lineHeight: 1,
                }}
                title={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted(product.id) ? "❤️" : "🤍"}
              </button>

              <Link to={`/singlepage/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={product.img}
                  alt={product.tittle}
                  width="100%"
                  height="150px"
                  style={{ objectFit: "contain" }}
                />
                <div className="card-body p-1 mt-2">
                  <p className="card-title fw-bold mb-1" style={{ fontSize: "0.95rem" }}>
                    {product.tittle}
                  </p>
                  <p className="mb-1" style={{ fontSize: "0.85rem", color: "#555" }}>
                    {product.P_name}
                  </p>
                  <StarRating value={product.Rating} />
                  <p className="mt-1 mb-2" style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                    ₹{product.Price.toLocaleString()}
                  </p>
                </div>
              </Link>
              <button
                className="btn btn-primary w-100"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { cart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

const Wishlist = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useContext(cart);
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h3>Please <Link to="/Login">login</Link> to view your wishlist.</h3>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <h1 className="p-5" style={{ minHeight: "80vh" }}>Your wishlist is empty.</h1>
    );
  }

  return (
    <div className="container py-4" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4">My Wishlist</h2>
      <div className="d-flex flex-wrap gap-3">
        {wishlistItems.map((item) => (
          <div key={item.product_id} className="card" style={{ width: "16rem", padding: "1rem", position: "relative" }}>
            <button
              onClick={() => toggleWishlist(item.product_id)}
              style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem" }}
              title="Remove from wishlist"
            >❤️</button>
            <Link to={`/singlepage/${item.product_id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={item.image_url} alt={item.title} width="100%" height="130px" style={{ objectFit: "contain" }} />
              <div className="mt-2">
                <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>{item.title}</p>
                <p className="mb-1" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>₹{item.price.toLocaleString()}</p>
              </div>
            </Link>
            <button
              className="btn btn-primary btn-sm w-100 mt-1"
              onClick={() => addToCart({ id: item.product_id, tittle: item.title, img: item.image_url, Price: item.price })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

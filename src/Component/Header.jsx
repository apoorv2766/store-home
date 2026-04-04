import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../Context/AuthContext";
import { cart } from "../Context/CartContext";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartData } = useContext(cart);
  const navigate = useNavigate();
  const cartCount = cartData.reduce((sum, e) => sum + (e.quantity || 1), 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light position-sticky top-0 "
        style={{ zIndex: "2" }}
      >
        <div className="container-fluid h-25">
          <Link to="/Home" className="nav-link">
            <b
              style={{
                fontSize: "20px",
                color: "rgb(14,103,183)",
              }}
            >
              Store@Home
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs" className="nav-link">
                  About
                </Link>
              </li>
              <div className="btn-group shadow-0 ">
                <Link to="/Product" className="nav-link">
                  Product
                </Link>
              </div>
              <li className="nav-item">
                <Link to="/ContactUs" className="nav-link">
                  ContactUs
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item d-flex align-items-center px-2">
                    <Link to="/Profile" style={{ textDecoration: "none", color: "#333" }}>
                      Hi, <b>{user.name.split(" ")[0]}</b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Wishlist" className="nav-link">
                      ❤️ Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Orders" className="nav-link">
                      📦 Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm my-auto mx-1"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/Login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/SignUp" className="nav-link">
                      SignUp
                    </Link>
                  </li>
                </>
              )}

              <li
                className="nav-item"
                style={{ fontSize: "2rem", marginTop: "-10px", position: "relative" }}
              >
                <Link to="/Cart" className="nav-link">
                  <AiOutlineShoppingCart />
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        background: "#dc3545",
                        color: "#fff",
                        borderRadius: "50%",
                        fontSize: "0.55rem",
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

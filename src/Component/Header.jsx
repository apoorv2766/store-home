import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
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
              <li className="nav-item">
                <Link to="/SignUp" className="nav-link">
                  SignUp
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ fontSize: "2rem", marginTop: "-10px" }}
              >
                <Link to="/cart" className="nav-link">
                  <AiOutlineShoppingCart />
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

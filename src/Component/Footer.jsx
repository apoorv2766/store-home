import React from "react";
import { Link } from "react-router-dom";
import "../Component/Css.css/Header.css";

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://www.facebook.com/login/"
              className="me-4 text-reset"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com/home/killer2766"
              className="me-4 text-reset"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Store@Home
                </h6>
                <p>
                  This is a Electronics Ecommerce Platform where all the
                  Products Customers can purchase like Mobiles Laptop Television
                  Wahing Machine.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link to="/Product" className="nav-link">
                    Mobiles
                  </Link>
                </p>
                <p>
                  <Link to="/laptop" className="nav-link">
                    Laptop
                  </Link>
                </p>
                <p>
                  <Link to="/Washing_Machine" className="nav-link">
                    Washing Machine
                  </Link>
                </p>
                <p>
                  <Link to="/Television" className="nav-link">
                    Television
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Product
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Signup
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> 2nd Cross Kundanhalli
                  Colony
                  <p style={{ marginLeft: "40px" }}>Brookfield Bangalore</p>
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  apoorv2766@outlook.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 91 8574537246
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> + 91 7007314074
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            Store@home.in
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

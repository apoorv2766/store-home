import React from "react";
import amazon from "../Component/assets/amazon.jpg";
import amazon1 from "./assets/amazon_1.gif";
import amazon2 from "./assets/amazon_2.jpg";
import amazon3 from "./assets/amazon_3.jpg";
import { Link } from "react-router-dom";
import "../Component/Css.css/Header.css";

const Home = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="container_fluid"
          id="carouselBasicExample"
          class="carousel slide carousel-fade"
          data-mdb-ride="carousel"
          style={{
            width: "98%",
            top: "2vh",
          }}
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div class="carousel-inner ">
            <div class="carousel-item active" style={{}}>
              <Link to="/Product" className="nav-link">
                <img
                  src={amazon}
                  style={{ height: "40vh" }}
                  class="d-block w-100"
                  alt="Cliff Above a Stormy Sea"
                />
              </Link>
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
            <div class="carousel-item" style={{ height: "40vh" }}>
              <a href="">
                <Link to="/Product" className="nav-link">
                  <img
                    src={amazon1}
                    style={{ height: "40vh" }}
                    class="d-block w-100"
                    alt="Canyon at Nigh"
                  />
                </Link>
              </a>
              <div class="carousel-caption d-none d-md-block"></div>
            </div>

            <div class="carousel-item">
              <Link to="/Mobile" className="nav-link">
                <img
                  src={amazon2}
                  style={{ height: "40vh" }}
                  class="d-block w-100"
                  alt="Cliff Above a Stormy Sea"
                />
              </Link>
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
            <div class="carousel-item" style={{}}>
              <Link to="/Washing_Machine" className="nav-link">
                <img
                  src={amazon3}
                  style={{ height: "40vh" }}
                  class="d-block w-100"
                  alt="Cliff Above a Stormy Sea"
                />
              </Link>
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div
        className="container_fluid"
        style={{
          marginTop: "5vh",
          display: "flex",
          height: "60vh",
        }}
      >
        <div
          className="container_fluid"
          style={{
            height: "55vh",
            width: "25%",
            margin: "18px",
            backgroundColor: "white",
          }}
        >
          <h3>Keep Shoping for</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
            }}
          >
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/3150P3KQFlL._MCnd_AC_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              <p> Smartphone</p>
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/51xKHE2Sc7L._MCnd_AC_.jpg"
                style={{ height: "20vh", width: "60%" }}
              />
              <p>Laptops</p>
            </a>
            <a href="">
              <img
                src="https://images-eu.ssl-images-amazon.com/images/I/71qGismu6NL._AC_UL200_SR150,200_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />

              <p>Samsung Phones</p>
            </a>
            <a href="">
              <img
                src="https://images-eu.ssl-images-amazon.com/images/I/71wbJ2D57xL._AC_UL400_SR300,400_.jpg"
                style={{ height: "20vh", width: "60%" }}
              />
              <p>Oneplus</p>
            </a>
          </div>
        </div>
        <div
          className="container_fluid"
          style={{
            height: "55vh",
            width: "25%",
            margin: "18px",
            backgroundColor: "white",
          }}
        >
          <h5>Up to 80% off | Laptops, smartwatches </h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "5px",
            }}
          >
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/61QJpARvgRL._AC_UL480_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              <p>LG</p>
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71ZMYMhP5TL._AC_UL480_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              <p>Washing Machine</p>
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71kuqRw8L5L._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              <p>Smart TV</p>
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71S8qt+K8hL._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              <p>Samsung LED</p>
            </a>
          </div>
        </div>
      </div>
      <div className="container_fluid" style={{ display: "flex" }}>
        <div
          className="container_fluid"
          style={{
            height: "55vh",
            width: "25%",
            margin: "18px",
            backgroundColor: "white",
          }}
        >
          <h3>Up to 70% off | Deals on</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
            }}
          >
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/61Id6WJDWqL._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "55%" }}
              />
              Smartphone
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71k3gOik46L._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Laptops
            </a>
            <a href="">
              <img
                src="https://images-eu.ssl-images-amazon.com/images/I/71qGismu6NL._AC_UL200_SR150,200_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Samsung Phones
            </a>
            <a href="">
              <img
                src="https://images-eu.ssl-images-amazon.com/images/I/71wbJ2D57xL._AC_UL400_SR300,400_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Oneplus
            </a>
          </div>
        </div>
        <div
          className="container_fluid"
          style={{
            height: "55vh",
            width: "25%",
            margin: "18px",
            backgroundColor: "white",
          }}
        >
          <h3>Keep Shoping for</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "5px",
            }}
          >
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71lYhcc++AL._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "60%" }}
              />
              Smartphone
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/51xKHE2Sc7L._MCnd_AC_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Laptops
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/51jUcRK69ML._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Samsung Phones
            </a>
            <a href="">
              <img
                src="https://m.media-amazon.com/images/I/71yjoXu2ZAL._AC_UY327_FMwebp_QL65_.jpg"
                style={{ height: "20vh", width: "70%" }}
              />
              Oneplus
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

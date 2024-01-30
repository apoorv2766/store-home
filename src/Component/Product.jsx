import React, { useContext, useState } from "react";
import "../Component/Css.css/Header.css";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
import { cart } from "../Context/CartContext";
import Category from "./Category";

const Product = () => {
  let { addToCart } = useContext(cart);
  const { item, arrResult } = useContext(ProductContext);

  return (
    <div className="d-flex w-100">
      <div style={{ position: "fixed", left: "0", width: "15%" }} className="">
        <Category />
      </div>

      <div
        className="d-flex"
        style={{
          position: "relative",
          left: "15%",
          width: "85%",
        }}
      >
        <div>
          {item.length == 0 ? (
            <div className="container m-3 p-1" style={{ height: "80vh" }}>
              <h2>No such match found!!!</h2>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-wrap gap-2 m-lg-4">
          {arrResult.map((item, i) => {
            return (
              <Link to={`/singlepage/${item.id}`}>
                <div key={i}>
                  <div
                    class="card"
                    style={{
                      width: "18rem",
                      padding: "1rem",
                    }}
                    key={i}
                  >
                    <div>
                      <img
                        src={item.img}
                        alt="Card image cap"
                        width="90%"
                        height="150px"
                      />
                    </div>
                    <div class="card-body p-1">
                      MRP:
                      <span
                        className="text-black"
                        style={{ fontSize: "1.7rem" }}
                      >
                        {item.Price}
                      </span>
                      <p class="card-title" style={{ fontSize: "1rem" }}>
                        Tittle:{item.tittle}
                      </p>
                      <p class="card-text p-0 m-0" style={{ fontSize: "1rem" }}>
                        Brand:{item.P_name}
                      </p>
                      <Link to="/cart">
                        <a
                          href="#"
                          class="btn btn-primary w-100"
                          style={{ marginTop: "0.8rem" }}
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          Add To Cart
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;

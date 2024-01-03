import React, { useContext, useState } from "react";
import "../Component/Css.css/Header.css";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import CategoryComp from "./CategoryComp";
import { cart } from "../Context/CartContext";

const Product = () => {
  let { addToCart } = useContext(cart);
  const {
    item,
    searchHandler,
    sortHandlerAZ,
    sortHandlerZA,
    sortHandlerLH,
    sortHandlerHL,
    arrResult,
  } = useContext(ProductContext);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 5fr",
        }}
      >
        <div style={{}}>
          <div
            className="d-flex input-group container_fluid"
            style={{
              marginTop: "3vh",
              width: "80%",
              paddingLeft: "10px",
              position: "relative",
            }}
          >
            <input
              type="search"
              className="form-control rounded"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={searchHandler}
              placeholder="search..."
            />
            <AiOutlineSearch
              style={{
                position: "absolute",
                right: "10px",
                top: "30%",
                zIndex: "99",
              }}
            />
          </div>
          <div id="categoryLink" style={{ margin: "2vh" }}>
            <h5>
              <b>Category:</b>
            </h5>
            <CategoryComp />
          </div>
          <div id="sorting" style={{ margin: "2vh" }}>
            <h5>
              <b>Filter:</b>
            </h5>
            <div>
              <Link
                id="categorycolor"
                onClick={() => {
                  sortHandlerAZ();
                }}
              >
                A-Z
              </Link>
            </div>
            <div>
              <Link
                id="categorycolor"
                onClick={() => {
                  sortHandlerZA();
                }}
              >
                Z-A
              </Link>
            </div>
            <div>
              <Link id="categorycolor" onClick={sortHandlerLH}>
                Low-High
              </Link>
            </div>
            <div>
              <Link id="categorycolor" onClick={sortHandlerHL}>
                High-Low
              </Link>
            </div>
          </div>
        </div>
        <div
          className="container_fluid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          {item.length == 0 ? (
            <div className="container m-3 p-1 c-red">
              <p>no match found!!!</p>
            </div>
          ) : (
            ""
          )}

          {arrResult.map((elem, i) => {
            let { img, id, tittle, Price, P_name, Rating } = elem;
            return (
              <div className="card mb-1 mt-3" key={i}>
                <div className="row g-0">
                  <div className="hover14 h-50 w-auto">
                    <Link to={`/singlepage/${elem.id}`}>
                      <figure>
                        <img
                          src={img}
                          alt=""
                          style={{
                            height: "130px",
                            width: "110%",
                            marginTop: "4vh",
                            paddingLeft: "10px",
                          }}
                        />
                      </figure>
                    </Link>
                  </div>
                  <div
                    className="col-md-7"
                    style={{
                      width: "60%",
                      paddingLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "25px",
                        paddingTop: "3vh",
                      }}
                    >
                      <h6>Model:{tittle}</h6>
                      <>MRP:{Price}</>
                      <br />
                      <>Brand:{P_name}</>
                      <br />
                      <>Rating:{Rating}</>
                      <Link to="/cart">
                        <button
                          className="btn btn-warning"
                          style={{
                            fontSize: "11px",
                            marginTop: "5px",
                          }}
                          onClick={() => {
                            addToCart(elem);
                          }}
                        >
                          Add To Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;

import React, { useContext } from "react";
import "../Component/Css.css/Header.css";
import { cart } from "../Context/CartContext";

const Cart = () => {
  let { cartData, removeHandler, removeAll } = useContext(cart);

  return cartData.length == 0 ? (
    <h1 style={{ height: "60vh" }}>cart is empty</h1>
  ) : (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <div id="item" className="container">
        <div className="d-flex justify-content-evenly gap-5 w-100">
          <div className="">
            <b>Item</b>
          </div>
          <div className="">
            <b>Price</b>
          </div>
          <div className="">
            <b>Remove</b>
          </div>
        </div>
      </div>
      {cartData.map((e, i) => {
        let { img, id, Price, tittle } = e;
        return (
          <div key={i} className=" d-flex justify-content-evenly w-100 mt-2">
            <div>
              <img
                src={img}
                alt=""
                className="img-fluid"
                style={{ width: "100px", height: "100px" }}
              />
              <div>{tittle}</div>
            </div>
            <div>{Price}</div>
            <div>
              <button
                onClick={() => {
                  removeHandler(id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => {
          removeAll();
        }}
      >
        remove all
      </button>
    </div>
  );
};

export default Cart;

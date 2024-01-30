import React, { useContext } from "react";
import "../Component/Css.css/Header.css";
import { cart } from "../Context/CartContext";

const Cart = () => {
  let { cartData, removeHandler, removeAll } = useContext(cart);

  return cartData.length == 0 ? (
    <h1 className="p-5" style={{height:"80vh"}}>No item in the cart...</h1>
  ) : (
    <div className="bg-white h-100">
      <div className="d-flex justify-content-evenly w-100 p-3 fs-2">
        <span>Item</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      {cartData.map((e, i) => {
        let { img, id, Price, tittle } = e;
        return (
          <div key={i} className=" d-flex justify-content-evenly">
            <div>
              <img
                src={img}
                alt=""
                className="img-fluid"
                style={{ height: "100px" }}
              />
              <p>{tittle}</p>
            </div>
            <span>{Price}</span>
            <div>
              <button
                className="btn btn-danger"
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
      <hr />
      <div className="d-flex justify-content-end " style={{marginRight:"20%"}}>
        <button
          className="btn btn-danger"
          onClick={() => {
            removeAll();
          }}
        >
          remove all
        </button>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./Css.css/Header.css";
import { ProductContext } from "../App";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { cart } from "../Context/CartContext";

const SinglePage = () => {
  const { id } = useParams();
  const { item } = useContext(ProductContext);
  let { addToCart } = useContext(cart);
  let arrfil = item.find((e) => {
    return e.id == id;
  });
  let { img, P_name, Price, Rating, Category, tittle, id: t } = arrfil;

  return (
    <>
      <div className="container_fluid" id="singlepage">
        <div>
          <img src={img} style={{ marginTop: "15vh", height: "40vh" }} />
        </div>
        <div id="details">
          <h2>
            Model:<span id="model"> {tittle}</span>
          </h2>

          <h2>
            Brand:<span id="model"> {P_name}</span>
          </h2>
          <h2>
            ₹<span id="model"> {Price}</span>
          </h2>
          <h2>
            Rating:<span id="model"> {Rating}</span>
          </h2>
          <h2>
            Category:<span id="model"> {Category}</span>
          </h2>

          <div id="plusminus">
            <AiOutlineMinusSquare />
            1
            <AiOutlinePlusSquare />
          </div>
          <Link to="/cart">
            <button
              className="btn btn-warning mt-3"
              onClick={() => {
                addToCart(arrfil);
              }}
            >
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SinglePage;

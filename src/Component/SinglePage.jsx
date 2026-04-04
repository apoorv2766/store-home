import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Css.css/Header.css";
import { ProductContext } from "../App";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { cart } from "../Context/CartContext";

function StarRating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<span key={i} style={{ color: "#f5a623", fontSize: "1.4rem" }}>★</span>);
    else if (value >= i - 0.5) stars.push(<span key={i} style={{ color: "#f5a623", fontSize: "1.4rem" }}>½</span>);
    else stars.push(<span key={i} style={{ color: "#ccc", fontSize: "1.4rem" }}>★</span>);
  }
  return <span>{stars} <small style={{ color: "#888" }}>({value})</small></span>;
}

const SinglePage = () => {
  const { id } = useParams();
  const { item } = useContext(ProductContext);
  const { addToCart } = useContext(cart);
  const [qty, setQty] = useState(1);

  const arrfil = item.find((e) => e.id === Number(id));

  if (!arrfil) {
    return (
      <div className="container mt-5 text-center">
        <h3>Product not found.</h3>
      </div>
    );
  }

  const { img, P_name, Price, Rating, Category, tittle, id: t } = arrfil;

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
            Rating:<span id="model"> <StarRating value={Rating} /></span>
          </h2>
          <h2>
            Category:<span id="model"> {Category}</span>
          </h2>

          <div id="plusminus">
            <AiOutlineMinusSquare
              style={{ cursor: "pointer" }}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            />
            {qty}
            <AiOutlinePlusSquare
              style={{ cursor: "pointer" }}
              onClick={() => setQty((q) => q + 1)}
            />
          </div>
          <Link to="/Cart">
            <button
              className="btn btn-warning mt-3"
              onClick={() => addToCart({ ...arrfil, quantity: qty })}
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

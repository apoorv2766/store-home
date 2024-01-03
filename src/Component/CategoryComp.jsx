import React, { useContext } from "react";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
import "../Component/Css.css/Header.css";

const CategoryComp = () => {
  const { product_spread, sortCategory } = useContext(ProductContext);

  let arr = product_spread.map((e) => {
    return [e.Category];
  });
  const arrflat = ["All", ...new Set(arr.flat())];

  return arrflat.map((e) => {
    return (
      <div>
        <Link
          id="categorycolor"
          onClick={() => {
            sortCategory(e);
          }}
        >
          {e}
        </Link>
      </div>
    );
  });
};

export default CategoryComp;

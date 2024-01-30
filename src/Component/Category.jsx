import React, { useContext } from "react";
import CategoryComp from "./CategoryComp";
import { AiOutlineSearch } from "react-icons/ai";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";

const Category = () => {
  const {
    searchHandler,
    sortHandlerAZ,
    sortHandlerHL,
    sortHandlerLH,
    sortHandlerZA,
  } = useContext(ProductContext);
  return (
    <div className="m-2">
      <div
        className="d-flex input-group container_fluid"
        style={{
          marginTop: "3vh",
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
  );
};

export default Category;

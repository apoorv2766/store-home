import React, { useContext } from "react";
import CategoryComp from "./CategoryComp";
import { AiOutlineSearch } from "react-icons/ai";
import { ProductContext } from "../App";

const SORTS = [
  { label: "A → Z",      fn: "sortHandlerAZ" },
  { label: "Z → A",      fn: "sortHandlerZA" },
  { label: "Price: Low → High", fn: "sortHandlerLH" },
  { label: "Price: High → Low", fn: "sortHandlerHL" },
];

const sideLabel = {
  color: "rgba(255,255,255,.5)", fontSize: "0.65rem",
  fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
  margin: "20px 0 8px 16px", display: "block",
};

const Category = () => {
  const { searchHandler, sortHandlerAZ, sortHandlerHL, sortHandlerLH, sortHandlerZA } =
    useContext(ProductContext);
  const fns = { sortHandlerAZ, sortHandlerZA, sortHandlerLH, sortHandlerHL };

  return (
    <div style={{ padding: "0 12px 24px" }}>
      {/* Brand */}
      <div style={{ padding: "0 4px 18px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>🛒 Store@Home</div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.45)", marginTop: "2px" }}>Electronics Store</div>
      </div>

      {/* Search */}
      <span style={sideLabel}>Search</span>
      <div style={{ position: "relative" }}>
        <input
          type="search"
          onChange={searchHandler}
          placeholder="Search products…"
          style={{
            width: "100%", padding: "9px 36px 9px 12px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,.15)",
            background: "rgba(255,255,255,.08)", color: "#fff",
            fontSize: "0.82rem", outline: "none",
          }}
        />
        <AiOutlineSearch style={{
          position: "absolute", right: "10px", top: "50%",
          transform: "translateY(-50%)", color: "rgba(255,255,255,.5)", fontSize: "1rem",
        }} />
      </div>

      {/* Categories */}
      <span style={sideLabel}>Category</span>
      <CategoryComp />

      {/* Sort */}
      <span style={sideLabel}>Sort by</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {SORTS.map(({ label, fn }) => (
          <button
            key={label}
            onClick={fns[fn]}
            style={{
              background: "rgba(255,255,255,.07)", border: "none",
              borderRadius: "8px", color: "rgba(255,255,255,.8)",
              padding: "9px 12px", textAlign: "left", cursor: "pointer",
              fontSize: "0.82rem", transition: "background .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(247,151,30,.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.07)")}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;

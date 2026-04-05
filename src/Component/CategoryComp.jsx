import React, { useContext, useState } from "react";
import { ProductContext } from "../App";

const CategoryComp = () => {
  const { product_spread, sortCategory } = useContext(ProductContext);
  const [active, setActive] = useState("All");

  const arr = product_spread.map((e) => e.Category);
  const arrflat = ["All", ...new Set(arr)];

  const handleClick = (cat) => {
    setActive(cat);
    sortCategory(cat);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {arrflat.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          style={{
            background: active === cat
              ? "linear-gradient(135deg,#f7971e,#ffd200)"
              : "rgba(255,255,255,.07)",
            border: "none", borderRadius: "8px",
            color: active === cat ? "#1a1a1a" : "rgba(255,255,255,.8)",
            padding: "9px 12px", textAlign: "left", cursor: "pointer",
            fontSize: "0.82rem", fontWeight: active === cat ? 700 : 400,
            transition: "background .15s, color .15s",
          }}
          onMouseEnter={(e) => {
            if (active !== cat) e.currentTarget.style.background = "rgba(247,151,30,.25)";
          }}
          onMouseLeave={(e) => {
            if (active !== cat) e.currentTarget.style.background = "rgba(255,255,255,.07)";
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryComp;

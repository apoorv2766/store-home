import React from "react";

/** Reusable star rating. size: font-size of stars, e.g. "0.9rem", "1.4rem", "11px" */
const StarRating = ({ value, size = "0.9rem" }) => (
  <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: i <= Math.round(value) ? "#f5a623" : "#ddd", fontSize: size }}>
        &#9733;
      </span>
    ))}
    <small style={{ color: "#aaa", marginLeft: "4px", fontSize: "0.78rem" }}>({value})</small>
  </span>
);

export default StarRating;

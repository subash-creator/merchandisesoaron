import React, { useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function HoodieCard({ color, addToCart }) {
  const [size, setSize] = useState("");
  

  return (
    <div className="hoodie-card">
      <div className="hoodie-img" style={{ backgroundColor: color.hex }}></div>

      <h3 className="hoodie-name">{color.name} Hoodie</h3>
      <p className="price">₹{price}</p>

      <div className="size-row">
        {sizes.map((s) => (
          <button
            key={s}
            className={`size-btn ${size === s ? "selected" : ""}`}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        className="add-btn"
        disabled={!size}
        onClick={() => addToCart({ product: "Soaron Hoodie", color: color.name, size, price })}
      >
        Add To Cart
      </button>
    </div>
  );
}

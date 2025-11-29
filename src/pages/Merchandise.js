import React, { useState, useEffect } from "react";
import CartPanel from "../components/CartPanel";
import Checkout from "../components/Checkout";
import "../styles/Merchandise.css";

import blackHoodie from "../assets/blackhoodie.webp";
import whiteHoodie from "../assets/whitehoodie.webp";
import blueHoodie from "../assets/bluehoodie.webp";
import greenHoodie from "../assets/greenhoodie.webp";
import orangeHoodie from "../assets/orangehoodie.webp";
import redHoodie from "../assets/redhoodie.webp";

export default function Merchandise() {
  const hoodieOptions = [
    { name: "Black", img: blackHoodie, price: 799 },
    { name: "White", img: whiteHoodie, price: 799 },
    { name: "Blue", img: blueHoodie, price: 799 },
    { name: "Green", img: greenHoodie, price: 799 },
    { name: "Orange", img: orangeHoodie, price: 799 },
    { name: "Red", img: redHoodie, price: 799 },
  ];

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("CART_DATA"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("CART_DATA", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (!selectedColor) {
      showMessage("❗ Please select a hoodie first!");
      return;
    }

    setCart([
      ...cart,
      {
        name: selectedColor.name,
        size: selectedSize,
        img: selectedColor.img,
        price: 799
      }
    ]);

    showMessage("✔️ Item added to cart!");
  };

  // 🔥 Runs when checkout closes (Cancel OR Success)
  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  // 🔥 Runs ONLY when order successful
  const handleOrderComplete = () => {
    setCart([]); 
    localStorage.removeItem("CART_DATA");
    showMessage("🎉 Order placed successfully!");
  };

  return (
    <div className="merch-page">

      {message && <span className="top-message">{message}</span>}

      <h1 className="title">Soaron Official Hoodies</h1>
      <p className="subtitle">Premium aviation-grade comfort — limited edition.</p>

      <div className="hoodie-row">
        {hoodieOptions.map((item, i) => (
          <div 
            key={i}
            className={`hoodie-image-box ${selectedColor?.name === item.name ? "active" : ""}`}
            onClick={() => {
              setSelectedColor(item);
              showMessage(`🧥 Selected: ${item.name}`);
            }}
          >
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
            <p className="price">₹{item.price}</p>
          </div>
        ))}
      </div>

      <div className="size-section">
        <h3>Select Size</h3>
        <div className="size-buttons">
          {sizeOptions.map((sz) => (
            <button 
              key={sz}
              className={`size-btn ${selectedSize === sz ? "selected" : ""}`}
              onClick={() => {
                setSelectedSize(sz);
                showMessage(`📏 Size selected: ${sz}`);
              }}
            >
              {sz}
            </button>
          ))}
        </div>

        <button className="add-cart-btn" onClick={addToCart}>
          Add to Cart 🛒
        </button>
      </div>

      <CartPanel cart={cart} onCheckout={() => setCheckoutOpen(true)} />

      {checkoutOpen && (
        <Checkout 
          cart={cart}
          onClose={handleCloseCheckout}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}

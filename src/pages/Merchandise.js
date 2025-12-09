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

import soaronTextLogo from "../assets/soaron_text.webp";
import soaronCircleLogo from "../assets/soaron_circle.png";

export default function Merchandise() {
  const hoodieOptions = [
    { name: "Black", img: blackHoodie,  colorCode: "#000000" },
    { name: "White", img: whiteHoodie,  colorCode: "#ffffff" },
    { name: "Blue", img: blueHoodie,  colorCode: "#1f75fe" },
    { name: "Green", img: greenHoodie, colorCode: "#2ecc71" },
    { name: "Orange", img: orangeHoodie,  colorCode: "#ff7f00" },
    { name: "Red", img: redHoodie,  colorCode: "#e74c3c" },
  ];

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("CART_DATA"));
    if (saved) setCart(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("CART_DATA", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (!selectedColor)
      return showMessage("❗ Please select a hoodie first!");

    if (!selectedSize)
      return showMessage("❗ Please select size!");

    setCart((prev) => [
      ...prev,
      {
        name: selectedColor.name,
        size: selectedSize,
        img: selectedColor.img,
        color: selectedColor.colorCode,
        price: 799,
        qty: 1,
      },
    ]);

    // Reset selections after adding to cart
    setSelectedColor(null);
    setSelectedSize("");

    showMessage("✔️ Added to cart!");
  };


  const updateQty = (index, qty) => {
    if (qty <= 0) return;
    const updated = [...cart];
    updated[index].qty = qty;
    setCart(updated);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    showMessage("🗑️ Removed!");
  };

  const openCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const closePanels = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
  };

  const beginCheckout = () => {
    if (cart.length === 0)
      return showMessage("🛍️ Add something before checkout!");
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const completeOrder = () => {
    setCart([]);
    localStorage.removeItem("CART_DATA");
    showMessage("🎉 Order Completed!");
    closePanels();
  };

  return (
    <div className="merch-page">

      {/* Watermarks */}
      <div className="watermark">
        {[{ top: "15%", left: "8%", size: 240 },
        { top: "55%", left: "75%", size: 300 },
        { top: "80%", left: "25%", size: 200 }]
          .map((pos, i) => (
            <img key={i} src={soaronCircleLogo} className="watermark-img"
              alt="" style={{ top: pos.top, left: pos.left, width: pos.size }} />
          ))}
      </div>

      {/* Logo */}
      <div className="soaron-logo-container">
        <img src={soaronTextLogo} className="soaron-header-logo" alt="Soaron" />
      </div>

      <h1 className="title">Official Hoodies</h1>
      <p className="subtitle">Premium aviation-grade comfort — limited edition.</p>

      <div className="single-section">

        {/* Hoodie Cards */}
        <div className="hoodie-row">
          {hoodieOptions.map((item) => (
            <div
              key={item.name}
              className={`hoodie-image-box ${selectedColor?.name === item.name ? "active" : ""
                }`}
              onClick={() => {
                setSelectedColor(item);
                showMessage(`🧥 Selected: ${item.name}`);
              }}>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            
            </div>
          ))}
        </div>

        {/* Size Selector */}
        <div className="size-section">
          <h3>Select Size</h3>
          <p className="selected-price">
            Price: <strong>₹{selectedColor?.price || 799}</strong>
          </p>


          <div className="size-buttons">
            {sizeOptions.map((sz) => (
              <button
                key={sz}
                className={`size-btn ${selectedSize === sz ? "selected" : ""}`}
                onClick={() => setSelectedSize(sz)}>
                {sz}
              </button>
            ))}
          </div>

          <button
            className="add-cart-btn"
            disabled={!selectedColor || !selectedSize}
            onClick={addToCart}
            style={{ opacity: (!selectedColor || !selectedSize) ? 0.4 : 1 }}
          >
            Add to Cart 🛒
          </button>

        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="size-btn" onClick={openCart}>🛒 My Cart</button>

          <button
            className="size-btn"
            onClick={beginCheckout}
            disabled={cart.length === 0}
            style={{ opacity: cart.length === 0 ? 0.4 : 1 }}>
            💳 Checkout
          </button>
        </div>
      </div>



      {/* Sliding Cart */}
      {isCartOpen && (
        <CartPanel
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onCheckout={beginCheckout}
          onClose={closePanels}
        />
      )}

      {/* Sliding Checkout */}
      {isCheckoutOpen && (

        <Checkout
          cart={cart}
          onClose={closePanels}
          onOrderComplete={completeOrder}
        />

      )}

      {message && <span className="top-message">{message}</span>}
    </div>
  );
}

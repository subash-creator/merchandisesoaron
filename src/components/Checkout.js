import React, { useState } from "react";
import "../styles/Checkout.css";

export default function Checkout({ cart, onClose, onOrderComplete }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    transactionId: "",
    proofLink: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((acc, i) => acc + (i.price || 1499), 0);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  };

  const submitOrder = async () => {
    if (!user.name || !user.email || !user.phone || !user.address)
      return showError("❗ Please fill all required fields.");

    if (!user.transactionId) return showError("❗ Enter your Transaction ID.");
    if (!user.proofLink) return showError("❗ Paste payment screenshot link.");

    setLoading(true);

    const formData = new FormData();
    formData.append("cart", JSON.stringify(cart));
    formData.append("user", JSON.stringify(user));

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwpqXk8ocGTpj4GWIA2pt0McKF_CUn2nJJdREYO8vV_L0g1CFrVnA7-_y5ypyX8PzEt/exec",
      { method: "POST", body: formData }
    );

    const result = await res.text();

    if (result.includes("SUCCESS")) {
      setSuccess(true);

      // 🔥 Clear cart & notify parent
      setTimeout(() => {
        onOrderComplete(); // clears cart in parent
        onClose(); // closes popup
      }, 1500);

    } else {
      showError("❌ Error while sending order.");
    }

    setLoading(false);
  };

  return (
    <div className="checkout-popup-bg">
      <div className="checkout-popup">

        {error && <span className="error-text">{error}</span>}



        {success && (
          <>
            <span className="success-text">
              🎉 Order Confirmed!<br />
              We will verify payment and contact you soon.
            </span>
          </>
        )}

        {!success && (
          <>
            <button className="close-checkout-btn" onClick={onClose}>✕</button>

            <h2>Checkout</h2>
            <p className="total-text">Total: ₹{total}</p>
            <div className="payment-info">
              <p>Pay via UPI: <b>soaron@upi</b></p>
              <p>Bank: <b>123456</b> | IFSC: <b>SOAR00011</b></p>
            </div>


            <input placeholder="Full Name" value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })} />

            <input placeholder="Email" value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <input placeholder="Phone Number" value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })} />

            <input placeholder="Delivery Address" value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })} />

            <input placeholder="Transaction ID" value={user.transactionId}
              onChange={(e) => setUser({ ...user, transactionId: e.target.value })} />

            <input placeholder="Paste Payment Screenshot Link" value={user.proofLink}
              onChange={(e) => setUser({ ...user, proofLink: e.target.value })} />

            <button className="confirm-btn" onClick={submitOrder} disabled={loading}>
              {loading ? <div className="loader"></div> : "Confirm Order"}
            </button>
            
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

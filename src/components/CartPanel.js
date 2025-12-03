import "../styles/CartPanel.css";

export default function CartPanel({ cart, onCheckout, onRemove, onUpdateQty }) {

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h3>🛒 Your Cart</h3>
      </div>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              {/* Product Image */}
              <img src={item.img} alt={item.name} className="cart-img" />

              {/* Details */}
              <div className="details">
                <p className="name">{item.name}</p>

                <div className="meta">
                  <span className="size">{item.size}</span>
                  <span className="price">₹{item.price * item.qty}</span>
                </div>

                {/* Quantity Control */}
                <div className="qty-wrapper">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(index, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>

                  <span className="qty-number">{item.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(index, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                className="remove-btn"
                onClick={() => onRemove(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {cart.length > 0 && (
        <div className="bottom">
          <p className="total">
            Total <strong>₹{total}</strong>
          </p>
          <button className="checkout" onClick={onCheckout}>
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

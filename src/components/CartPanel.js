export default function CartPanel({ cart, onCheckout }) {
  const total = cart.reduce((acc, i) => acc + i.price, 0);

  return (
    <div className="cart-panel">
      <p>🧺 Cart: {cart.length} item(s)</p>
      <p>Total: ₹{total}</p>
      {cart.length > 0 && <button className="checkout-btn" onClick={onCheckout}>Checkout</button>}
    </div>
  );
}

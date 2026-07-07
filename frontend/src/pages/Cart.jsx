import { Link } from "react-router-dom";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ₹{total}</h4>
            <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

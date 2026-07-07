import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ auth, cartItems, total, createOrder, setCartItems }) {
  const [name, setName] = useState(auth.user?.name || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    } else if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [auth.user, cartItems.length, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!auth.user) {
      setMessage("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      setMessage("Cart is empty.");
      return;
    }

    try {
      await createOrder({
        products: cartItems,
        total,
        shipping: { name, address, phone, paymentMethod }
      });
      setCartItems([]);
      navigate("/orders");
    } catch (error) {
      setMessage("Failed to place order.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4 shadow-sm">
          <h2>Checkout</h2>
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>Cash On Delivery</option>
                <option>UPI</option>
                <option>Card Payment</option>
              </select>
            </div>
            <div className="mb-3">
              <h5>Total: ₹{total}</h5>
            </div>
            <button type="submit" className="btn btn-success">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

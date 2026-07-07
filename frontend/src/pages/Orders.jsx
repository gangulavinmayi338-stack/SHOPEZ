import { useEffect, useState } from "react";
import axios from "axios";

function Orders({ auth, getAuthHeaders }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.user) return;
    axios.get("/orders", getAuthHeaders()).then((res) => setOrders(res.data)).catch(console.error);
  }, [auth, getAuthHeaders]);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item mb-2">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>Order #{order._id}</h5>
                  <p>Status: {order.status}</p>
                </div>
                <div>
                  <strong>Total: ₹{order.total}</strong>
                </div>
              </div>
              <div>
                {order.products.map((product) => (
                  <div key={product.productId} className="d-flex justify-content-between">
                    <div>{product.name} x {product.quantity}</div>
                    <div>₹{product.price * product.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

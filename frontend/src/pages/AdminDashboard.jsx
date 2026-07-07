import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard({ getAuthHeaders }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState({ name: "", price: "", image: "", category: "" });

  const loadProducts = () => {
    axios.get("/products").then((res) => setProducts(res.data)).catch(console.error);
  };

  const loadOrders = () => {
    axios.get("/orders", getAuthHeaders()).then((res) => setOrders(res.data)).catch(console.error);
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const handleAddProduct = async (event) => {
    event.preventDefault();
    await axios.post("/products", productForm, getAuthHeaders());
    setProductForm({ name: "", price: "", image: "", category: "" });
    loadProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`, getAuthHeaders());
    loadProducts();
  };

  const handleStatus = async (id, status) => {
    await axios.put(`/orders/${id}`, { status }, getAuthHeaders());
    loadOrders();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h4>Add Product</h4>
            <form onSubmit={handleAddProduct}>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Image URL</label>
                <input className="form-control" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Category</label>
                <input className="form-control" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required />
              </div>
              <button className="btn btn-success">Add Product</button>
            </form>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h4>Manage Products</h4>
            <div className="list-group">
              {products.map((product) => (
                <div key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>{product.name} - ₹{product.price}</div>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3 shadow-sm">
        <h4>Orders</h4>
        {orders.map((order) => (
          <div key={order._id} className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Order #{order._id}</strong>
                <p>Status: {order.status}</p>
              </div>
              <div>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleStatus(order._id, "Packed")}>Packed</button>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleStatus(order._id, "Shipped")}>Shipped</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleStatus(order._id, "Delivered")}>Delivered</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

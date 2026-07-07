import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedCart = localStorage.getItem("cart");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const login = (authData) => {
    setAuth(authData);
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    setCartItems([]);
  };

  const getAuthHeaders = () => ({
    headers: { Authorization: auth.token ? `Bearer ${auth.token}` : "" }
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const createOrder = async (orderData) => {
    const formattedProducts = orderData.products.map((product) => ({
      productId: product.id || product.productId || "",
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }));

    const response = await axios.post(
      "/orders",
      { ...orderData, products: formattedProducts },
      getAuthHeaders()
    );
    return response.data;
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar auth={auth} logout={logout} cartCount={cartItems.length} />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register login={login} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
          />
          <Route
            path="/checkout"
            element={<Checkout auth={auth} cartItems={cartItems} total={total} createOrder={createOrder} setCartItems={setCartItems} />}
          />
          <Route path="/orders" element={<Orders auth={auth} getAuthHeaders={getAuthHeaders} />} />
          <Route
            path="/admin"
            element={auth.user?.isAdmin ? <AdminDashboard getAuthHeaders={getAuthHeaders} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

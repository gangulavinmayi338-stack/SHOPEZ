import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to ShopEase</h1>
      <p className="lead">Shop your favorite products, checkout quickly, and manage orders easily.</p>
      <Link className="btn btn-primary btn-lg" to="/products">Browse Products</Link>
    </div>
  );
}

export default Home;

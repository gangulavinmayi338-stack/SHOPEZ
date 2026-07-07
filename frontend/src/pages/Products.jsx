import { useEffect, useState } from "react";
import axios from "axios";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} loading="lazy" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text mb-1">{product.category}</p>
                <p className="card-text fw-bold">₹{product.price}</p>
                <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

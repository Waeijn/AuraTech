// Sprint 2: Member 3
// Task: Show product details based on route param `id`.
// Minimal implementation returns sample data; Member 3 will replace with real fetching logic.

import { useParams } from "react-router-dom";
import products from "../data/products.json";
import "../styles/product.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <div className="product-details"><p>Product not found.</p></div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image || "/img/products/placeholder.png"} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ₱{product.price}</p>
      <p>Member 4 will provide add-to-cart integration in Sprint 4.</p>
    </div>
  );
}

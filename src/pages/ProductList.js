// Sprint 2: Member 3
// Task: Render a product listing using data from /src/data/products.js.
// Ensure the page renders even if data is empty.

import "../styles/product.css";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

export default function ProductList() {
  return (
    <section className="product-list-page">
      <h1>Products</h1>
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No products available. Please populate /src/data/products.js</p>
        )}
      </div>
    </section>
  );
}

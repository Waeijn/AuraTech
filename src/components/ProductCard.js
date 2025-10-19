// Sprint 2: Member 3
// Task: Create a reusable ProductCard that shows minimal product info.
// NOTE to Member 3: Expand this component with add-to-cart actions in later sprints.

import { Link } from "react-router-dom";
import "../styles/product.css";

export default function ProductCard({ product }) {
  // product = { id, name, price, image, shortDesc }
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-card__image">
          <img src={product.image || "/img/products/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-card__body">
          <h3>{product.name}</h3>
          <p>{product.shortDesc}</p>
          <div className="product-card__price">₱{product.price}</div>
        </div>
      </Link>
    </article>
  );
}

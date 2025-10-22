// Sprint 2: Member 3
// Task: Display individual product cards for Featured and ProductList components
// Sprint 4: Member 4 - Implements Add to Cart logic with Quantity Modal trigger.

import { useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import "../styles/product.css";
const INVENTORY_KEY = 'temporary_inventory';

const getInventory = () => {
    let inventory = JSON.parse(localStorage.getItem(INVENTORY_KEY));
    if (!inventory) {
        const initialStock = {};
        productsData.forEach(p => {
            initialStock[p.id] = p.stock || 99999;
        });
        inventory = initialStock;
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    }
    return inventory;
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); 

    getInventory();

    if (window.showQuantityModal) {
        window.showQuantityModal(product);
    } else {
        console.error("Quantity modal not initialized. Ensure the parent component is rendered.");
        alert(`Modal not available. Add 1 x ${product.name} to cart.`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };
  
  const inventory = getInventory();
  const currentStock = inventory[product.id] || 0;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <h3>{product.name}</h3>
      <p className="product-price">₱{product.price.toLocaleString()}</p>

      <p
        className={`product-stock ${
          currentStock > 0 ? "in-stock" : "out-of-stock"
        }`}
      >
        {currentStock > 0
          ? `In Stock: ${currentStock}`
          : "Out of Stock"}
      </p>

      <div className="card-buttons">
        <button className="btn-main" onClick={handleViewDetails}>
          View Details
        </button>
        <button className="btn-secondary" onClick={handleAddToCart} disabled={currentStock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
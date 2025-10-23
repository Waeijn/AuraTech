// Sprint 4: Member 4
// Task: Implement Checkout form, display receipt, and deduct stock from local storage.

import React, { useState } from "react";
import "../styles/checkout.css";
import productsData from "../data/products.json"; 

const SHIPPING_RATE = 0.10;
const INVENTORY_KEY = 'temporary_inventory';

const getInventory = () => {
    let inventory = JSON.parse(localStorage.getItem(INVENTORY_KEY));
    if (!inventory) {
        const initialStock = {};
        productsData.forEach(p => { initialStock[p.id] = p.stock || 99999; });
        inventory = initialStock;
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    }
    return inventory;
};

const saveInventory = (inventory) => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
};

const calculateCheckoutTotals = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const checkedItems = cartItems.filter(item => item.isChecked);
    
    const totalCount = checkedItems.reduce((sum, item) => sum + item.quantity, 0); 

    const checkedSubtotal = checkedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
      
    const shippingFee = checkedSubtotal * SHIPPING_RATE;
    const total = checkedSubtotal + shippingFee;
    
    return { checkedItems, checkedSubtotal, shippingFee, total, totalCount };
};

const deductStockAndSave = (purchasedItems) => {
    const currentInventory = getInventory();
    
    purchasedItems.forEach(item => {
        const itemId = item.id;
        const purchasedQty = item.quantity;
        
        const currentStock = currentInventory[itemId] || 0;
        
        currentInventory[itemId] = Math.max(0, currentStock - purchasedQty);
    });

    saveInventory(currentInventory);
    console.log("Stock successfully deducted from temporary local inventory.");
};


export default function Checkout() {
  const [formData, setFormData] = useState({ fullname: '', email: '', address: '', city: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState({ total: 0, totalCount: 0, email: '' });
  
  const { checkedItems, checkedSubtotal, shippingFee, total, totalCount } = calculateCheckoutTotals();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalOrder = calculateCheckoutTotals();

    if (finalOrder.checkedItems.length === 0) {
        alert("Please select items to proceed with the purchase.");
        return;
    }
    
    deductStockAndSave(finalOrder.checkedItems);
    
    setReceiptData({
        total: finalOrder.total,
        totalCount: finalOrder.totalCount,
        email: formData.email,
    });

    const finalCart = (JSON.parse(localStorage.getItem('cart')) || [])
                        .filter(item => !item.isChecked);
    localStorage.setItem('cart', JSON.stringify(finalCart));
    
    setIsSubmitted(true);
  }

  if (isSubmitted) {
      return (
          <section className="checkout-page thank-you-page">
              <h1>Order Placed!</h1>
              <div className="receipt-box">
                  <h3>Purchase Receipt</h3>
                  <p className="receipt-total">Total Charged:</p>
                  <p className="receipt-amount">₱{receiptData.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  
                  <p className="receipt-message">Your order for {receiptData.totalCount} items has been placed successfully.</p>
                  
                  <p>A confirmation email will be sent to {receiptData.email || 'your email'}.</p>
              </div>
              <div style={{ marginTop: '30px' }}>
                <a href="/" className="btn-main">Return to Home</a>
              </div>
          </section>
      );
  }


  return (
    <section className="checkout-page">
      <h1>Checkout</h1>
      
      {checkedItems.length === 0 ? (
          <div className="cart-placeholder">
            <h2>No Items Selected for Checkout</h2>
            <p>Please return to the cart to select products for purchase.</p>
            <a href="/cart" className="btn-main shop-now-link">Go to Cart</a>
          </div>
      ) : (
        <div className="checkout-container">
            
            <div className="order-summary">
                <h2>Your Order ({totalCount} Items)</h2>
                <div className="summary-list">
                    {checkedItems.map(item => (
                        <div key={item.id} className="summary-item">
                            <img src={item.image || "/img/products/placeholder.png"} alt={item.name} />
                            <div className="summary-item-details">
                                <h4>{item.name}</h4>
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <p className="summary-item-price">₱{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                
                <div className="summary-calculations"> 
                    <div className="summary-row">
                      <p>Items Subtotal:</p>
                      <p>₱{checkedSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    
                    <div className="summary-row">
                      <p>Shipping (10%):</p>
                      <p>₱{shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    
                    <div className="summary-total">
                      <h3>Total:</h3>
                      <h3>₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </div>
                </div>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              
              <h2>Shipping Information</h2>
              
              <label>
                Full Name
                <input name="fullname" placeholder="John Doe" value={formData.fullname} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Address
                <input name="address" placeholder="Shipping address" value={formData.address} onChange={handleChange} required />
              </label>
              <label>
                City
                <input name="city" placeholder="e.g., Manila" value={formData.city} onChange={handleChange} required />
              </label>

              <button type="submit" className="btn-main checkout-btn">
                Place Order (₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </button>
            </form>
        </div>
      )}
    </section>
  );
}
import React from "react";
import "../styles/purchase.css";

export default function PurchaseHistory() {
  return (
    <div className="purchase-history-container">
      <h1>My Purchase History</h1>
      <p>
        This page will display a list of all past purchases made by the
        logged-in user.
      </p>

      <table className="purchase-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{/*Placeholder data */}</tbody>
      </table>
    </div>
  );
}

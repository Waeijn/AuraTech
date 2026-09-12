import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { api } from "../../utils/api";
import { API_ENDPOINTS } from "../../config/api";
// Skeleton component for an individual stat card
const AdminCardSkeleton = () => (
  <div className="admin-card skeleton-card">
    {/* Title Skeleton */}
    <div
      className="skeleton-text"
      style={{ width: "60%", height: "1.2rem", marginBottom: "10px" }}
    ></div>
    {/* Value Skeleton */}
    <div
      className="skeleton-text"
      style={{ width: "40%", height: "2rem" }}
    ></div>
  </div>
);

// Skeleton component for the Recent Activity table
const RecentActivitySkeleton = () => (
  <div className="admin-table-container">
    <table className="admin-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {/* 5 Skeleton Rows */}
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="skeleton-row">
            <td>
              <div
                className="skeleton-text"
                style={{ width: "80%", height: "1rem" }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-text"
                style={{ width: "90%", height: "1rem" }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-text"
                style={{ width: "50%", height: "1rem" }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-text"
                style={{ width: "70%", height: "1rem" }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-text"
                style={{ width: "60%", height: "1rem" }}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    newOrders: 0,
    pendingUsers: 0,
    criticalStock: 0,
    loading: true,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Fetch pre-calculated stats directly from the backend
      const response = await api.get(API_ENDPOINTS.DASHBOARD);
      const data = response.data;

      setStats({
        totalSales: data.totalSales || 0,
        newOrders: data.newOrders || 0,
        pendingUsers: data.pendingUsers || 0,
        criticalStock: data.criticalStock || 0,
        loading: false,
      });

      setRecentActivity(data.recentActivity || []);
    } catch (error) {
      console.error("Error loading stats:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  // Skeleton Loading State UI
  if (stats.loading) {
    return (
      <AdminLayout>
        <div className="dashboard-header">
          <div
            className="skeleton-text"
            style={{ width: "300px", height: "2.2rem", marginBottom: "8px" }}
          ></div>
          <div
            className="skeleton-text"
            style={{ width: "400px", height: "1rem" }}
          ></div>
        </div>

        <div className="admin-grid">
          <AdminCardSkeleton />
          <AdminCardSkeleton />
          <AdminCardSkeleton />
          <AdminCardSkeleton />
        </div>

        <div style={{ marginTop: "40px" }}>
          <div
            className="skeleton-text"
            style={{ width: "200px", height: "1.8rem", marginBottom: "20px" }}
          ></div>
          <RecentActivitySkeleton />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome, Admin! Here is a summary of your key metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Total Sales</h3>
          <p>
            ₱
            {stats.totalSales.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="admin-card">
          <h3>New Orders</h3>
          <p>{stats.newOrders}</p>
        </div>
        <div className="admin-card">
          <h3>Pending Users</h3>
          <p>{stats.pendingUsers}</p>
        </div>
        <div className="admin-card" style={{ borderLeftColor: "#ef4444" }}>
          <h3>Stock Alerts</h3>
          <p style={{ color: "#ef4444" }}>
            {stats.criticalStock} critical items
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div style={{ marginTop: "40px" }}>
        <h2
          style={{ marginBottom: "20px", color: "var(--color-text-primary)" }}
        >
          Recent Activity
        </h2>
        <div className="admin-table-container">
          {recentActivity.length === 0 ? (
            <div className="empty-state">
              <p>No recent activity to display.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((order) => {
                  const userName =
                    order.user?.name || order.userName || "Guest";
                  const total = order.total_amount || order.total || 0;
                  const status = order.status || "pending";

                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{userName}</td>
                      <td className="price-cell">₱{total.toLocaleString()}</td>
                      <td>
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor:
                              status === "completed" || status === "delivered"
                                ? "#10b981"
                                : status === "pending"
                                ? "#f59e0b"
                                : status === "cancelled"
                                ? "#ef4444"
                                : "#3b82f6",
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        {new Date(
                          order.created_at || order.date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

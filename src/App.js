// Sprint 5: Member 5
// Task: Integrate routes created across sprints and ensure pages render.
// Member 5 will update routing when new pages are added. Keep routes simple and safe.

import { Routes, Route, Navigate } from "react-router-dom";

// Pages (placeholders)
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Basic App shell to allow independent testing per sprint.
export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Routes>
          {/* Sprint 1 routes (Member 2) */}
          <Route path="/" element={<HomePage />} />
          {/* Sprint 2 routes (Member 3) */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Sprint 4 routes (Member 4) */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Sprint 3 routes (Member 2) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

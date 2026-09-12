# AuraTech E-Commerce Platform

AuraTech is a modern, full-stack e-commerce platform designed for selling high-performance gaming gear, smartphones, and accessories.

Built natively as a monorepo, it features a blazingly fast **React** frontend and a robust **Laravel** backend, entirely containerized via **Docker** for a seamless development experience.

---

## Tech Stack

### Frontend
- **React 18** (Bootstrapped with Vite/CRA)
- **React Router** for SPA navigation
- **Context API** for global Authentication & Cart state
- Custom CSS & Bootstrap

### Backend
- **Laravel** (PHP 8.3)
- **MySQL 8.0**
- **Sanctum** for secure API Token Authentication
- **Eloquent ORM** with complex relationship mappings

### Infrastructure
- **Docker & Docker Compose** (Unified services)
- **phpMyAdmin** for database management
- Optimized Docker volumes for Windows/WSL2 performance

---

## Key Features

- **Product Catalog:** Filter, search, and browse categories dynamically.
- **Product Reviews & Ratings:** Authenticated users can leave 1-5 star ratings and comments. Automatically calculates and displays average ratings.
- **Shopping Cart:** Add products, manage quantities, and checkout (persisted via DB).
- **Authentication:** Secure Registration and Login using Laravel Sanctum.
- **Admin Dashboard:** Real-time SQL-optimized statistics (Total Users, Sales, Orders) and product management.
- **Stock Management:** Live inventory tracking that prevents ordering out-of-stock items.

---

## Getting Started

We have mapped the standard `npm` commands at the root of the project to control the entire Docker ecosystem automatically.

### Prerequisites
- [Docker Desktop](https://www.docker.com/) (Make sure it is running)
- Node.js (for running the root NPM scripts)

### 1. Boot the Application
Open a terminal in the root folder (`auratech`) and run:
```bash
npm start
```
*(This triggers `docker-compose up -d` in the background and spins up all 4 containers simultaneously).*

### 2. Access the Services
Once running, you can access the services at these ports:
- **Frontend Web App:** [http://localhost:4000](http://localhost:4000)
- **Backend API:** [http://localhost:18082](http://localhost:18082)
- **phpMyAdmin:** [http://localhost:18081](http://localhost:18081)
- **MySQL Database:** `localhost:3307`

### 3. Shutting Down
To safely stop all containers and free up your computer's RAM, run:
```bash
npm stop
```

---

## Default Credentials

**Admin Account:**
- **Email:** `admin@auratech.com`
- **Password:** `admin123`

**Test User Account:**
- **Email:** `user@auratech.com`
- **Password:** `password123`

*(Note: Ensure you run database seeders if these accounts are missing).*

---

## Architecture Notes

To bypass a notorious Windows Hyper-V port exhaustion bug, the Backend API and phpMyAdmin have been mapped to the `18000` port range. 

Additionally, to maximize Docker performance on Windows, both the `node_modules` (Frontend) and `vendor` (Backend) directories are isolated into native Linux named volumes (`frontend_node_modules`, `backend_vendor`). Polling is disabled by default to prevent CPU spikes.

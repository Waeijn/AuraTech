# Auratech

Auratech is a full-stack application consisting of a React frontend and a Laravel backend.

## Project Structure

- **`auratech-frontend/`**: The frontend application built with React and Bootstrap.
- **`auratech-backend/`**: The backend API built with PHP 8.3 and Laravel, served by Apache.

## Getting Started

Both the frontend and backend are containerized using Docker. You can find `Dockerfile` and `docker-compose.yml` configurations in their respective directories.

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Application

We use a unified `docker-compose.yml` at the root of the project to orchestrate all services simultaneously.

To start the entire application (Frontend, Backend, MySQL, and phpMyAdmin), simply run:

```bash
docker-compose up -d
```

#### Services & Ports
- **Frontend (React):** [http://localhost:4000](http://localhost:4000)
- **Backend API (Laravel):** [http://localhost:8082](http://localhost:8082)
- **Database (MySQL):** `localhost:3307`
- **phpMyAdmin:** [http://localhost:8081](http://localhost:8081)

To stop the application, run:
```bash
docker-compose down
```

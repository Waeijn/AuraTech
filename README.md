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

To run the application, navigate to each directory and use `docker-compose` or the provided scripts.

#### Frontend
```bash
cd auratech-frontend
docker-compose up -d
```

#### Backend
```bash
cd auratech-backend
docker-compose up -d
```

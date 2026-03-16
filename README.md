# Full Stack To-Do Application

A **full stack To-Do application** built with **React, TypeScript, Spring Boot, and PostgreSQL**.

The project allows users to create tasks, view pending tasks, and mark them as completed through a responsive user interface connected to a RESTful backend API.

---

# Architecture

Frontend → Backend → Database

```
React (Vite + TypeScript)
        │
        │ HTTP REST API
        ▼
Spring Boot (Java 17)
        │
        │ JPA / Hibernate
        ▼
PostgreSQL
```

---

# Tech Stack

## Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Vitest
* Testing Library

## Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok
* Testcontainers (for testing)

## Database

* PostgreSQL

---

# Features

### Task Management

* Create tasks with title and description
* View pending tasks
* Display **only the 5 most recent pending tasks**
* Mark tasks as completed
* Completed tasks are hidden from the UI

### UI Features

* Responsive design for desktop and mobile
* Toast notifications for user feedback
* Loading skeleton while fetching tasks

### Backend Features

* REST API for task management
* PostgreSQL database persistence
* Optimized database index for fetching recent tasks
* Validation for request data
* Integration testing using Testcontainers

---

# Project Structure

```
todo-app
│
├── backend
│   ├── src/main/java/com/todo
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   └── model
│   │
│   ├── src/main/resources
│   │   ├── application.yml
│   │   └── schema.sql
│   │
│   └── pom.xml
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   │
│   │   ├── services
│   │   │   └── taskService.ts
│   │   │
│   │   ├── types
│   │   │   └── task.ts
│   │   │
│   │   └── __tests__
│   │
│   └── package.json
│
└── README.md
```

---

# Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* Java 17+
* Maven
* PostgreSQL

---

# Database Setup

Create a database:

```
todo_db
```

PostgreSQL runs on:

```
localhost:5432
```

Database schema is automatically created from `schema.sql`.

---

# Environment Variables

Backend configuration can use environment variables.

Example `.env` file:

```
DB_URL=jdbc:postgresql://localhost:5432/todo_db
DB_USERNAME=postgres
DB_PASSWORD=password
SERVER_PORT=8080
```

---

# Running the Backend

Navigate to the backend directory:

```
cd backend
```

Start the Spring Boot application:

```
mvn spring-boot:run
```

Backend server runs on:

```
http://localhost:8080
```

---

# Running the Frontend

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | /api/tasks               | Fetch all tasks        |
| POST   | /api/tasks               | Create a new task      |
| PATCH  | /api/tasks/{id}/complete | Mark task as completed |

Example request:

```
POST /api/tasks
```

```
{
  "title": "Learn Spring Boot",
  "description": "Build REST API"
}
```

---

# Runtime Ports

| Service    | URL                   | Port |
| ---------- | --------------------- | ---- |
| Frontend   | http://localhost:5173 | 5173 |
| Backend    | http://localhost:8080 | 8080 |
| PostgreSQL | localhost             | 5432 |

---

# Running Tests

### Frontend

```
npm run test
```

### Backend

```
mvn test
```

Backend tests use **Testcontainers** to run PostgreSQL in an isolated environment.

---

# Docker (Optional)

Frontend example:

```
docker build -t todo-frontend .
docker run -p 3000:80 todo-frontend
```

---

# Performance Optimization

The database includes an index to efficiently retrieve the **5 most recent incomplete tasks**.

```
CREATE INDEX idx_task_completed_created
ON task (completed, created_at DESC);
```

---

# Notes

* The frontend uses a **Vite proxy** to forward API requests to the backend.
* Only **5 pending tasks** are displayed to satisfy the requirement.
* Completed tasks are hidden from the UI after refresh.

---

# Author

Developed as a **Full Stack To-Do Application** using React and Spring Boot.

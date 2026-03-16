# To Do App Frontend

A responsive **To-Do application frontend** built using **React, TypeScript, Vite, and Tailwind CSS**.
This application allows users to create tasks and mark them as completed through a clean and mobile-friendly interface.

---

# Features

* Create new tasks with a **title and description**
* View only **pending tasks**
* Display only the **5 most recent pending tasks**
* Mark tasks as **completed using the Done button**
* Hide completed tasks from the UI
* **Responsive layout** for desktop and mobile devices
* **Toast notifications** for task completion feedback
* **Loading skeleton UI** while tasks are being fetched

---

# Tech Stack

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Vitest
* Testing Library

---

# Project Structure

```
src/
  App.tsx
  main.tsx
  index.css
  setupTests.ts

  components/
    TaskCard.tsx
    TaskForm.tsx
    TaskList.tsx

  services/
    taskService.ts

  types/
    task.ts

  __tests__/
    TaskCard.test.tsx
    TaskForm.test.tsx
```

---

# Prerequisites

Before running the project ensure you have:

* Node.js **18+**
* npm
* A running **Spring Boot backend**
* **PostgreSQL** database

---

# Installation

Clone the repository and install dependencies.

```bash
npm install
```

---

# Running the Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

# Backend Integration

This frontend is designed to work with a **Spring Boot backend** running on:

```
http://localhost:8080
```

API requests from the frontend are proxied to the backend using **Vite proxy configuration**.

Example endpoints expected by the frontend:

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | /api/tasks              | Fetch all tasks        |
| POST   | /api/tasks              | Create a new task      |
| PATCH  | /api/tasks/:id/complete | Mark task as completed |

The API logic is implemented in:

```
src/services/taskService.ts
```

---

# Runtime Ports

| Service    | Port |
| ---------- | ---- |
| Frontend   | 5173 |
| Backend    | 8080 |
| PostgreSQL | 5432 |

---

# Available Scripts

| Script             | Description                   |
| ------------------ | ----------------------------- |
| npm run dev        | Start Vite development server |
| npm run build      | Build production bundle       |
| npm run preview    | Preview production build      |
| npm run lint       | Run ESLint                    |
| npm run test       | Run tests once                |
| npm run test:watch | Run tests in watch mode       |

---

# Running Tests

Tests are written using **Vitest** and **Testing Library**.

Run tests using:

```bash
npm run test
```

The test environment uses **jsdom**.

---

# Docker

This project includes a production Docker setup.

### Build Docker image

```bash
docker build -t todo-frontend .
```

### Run container

```bash
docker run -p 3000:80 todo-frontend
```

Then open:

```
http://localhost:3000
```

---

# Build Output

Production files are generated in the `dist/` directory after running:

```bash
npm run build
```

---

# Notes

* Ensure the backend server is running before creating tasks.
* The UI intentionally displays **only 5 pending tasks** based on the requirement.
* Proxy configuration for the backend is located in:

```
vite.config.ts
```

---

# Author

Frontend developed as part of a **To-Do application full stack project** using React and Spring Boot.

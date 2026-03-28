# 🚀 Backend Developer Intern Assignment - PrimeTrade.ai

A robust, scalable REST API built with **Node.js, Express, and MongoDB**.  
This project includes secure JWT authentication, Role-Based Access Control (RBAC), full CRUD functionality for tasks, and a Vanilla JavaScript frontend dashboard to interact with the APIs.

---

## ✨ Core Features

- **Authentication & Authorization**  
  Secure user registration and login using `bcrypt` and `jsonwebtoken`.

- **Role-Based Access Control (RBAC)**  
  - Admins → view/delete all tasks  
  - Users → manage only their own tasks  

- **RESTful CRUD APIs**  
  Create, Read, Update, and Delete tasks.

- **Security First**  
  Input validation using `express-validator` and secure token handling.

- **Interactive Frontend**  
  Lightweight Vanilla JS + CSS dashboard to test APIs.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js (ES6 Modules)  
- **Database:** MongoDB Atlas, Mongoose  
- **Security:** bcrypt, jsonwebtoken, cors  
- **Frontend:** HTML5, CSS3, Vanilla JavaScript  

---

## 💻 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server

```bash
# Production
npm start

# Development
npm run dev
```

### 5. Open App

```
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔐 Auth Routes

- `POST /api/v1/auth/register` → Register user  
- `POST /api/v1/auth/login` → Login & get JWT  

### 📌 Task Routes (Protected)

- `POST /api/v1/tasks` → Create task  
- `GET /api/v1/tasks` → Get tasks  
- `PUT /api/v1/tasks/:id` → Update task  
- `DELETE /api/v1/tasks/:id` → Delete task  

---
## 📡 API Endpoints & Documentation

**A complete Postman collection (`Postman_Collection.json`) is included in the root of this repository.** Import it into your Postman workspace to instantly test all endpoints.

### 🔐 Auth Routes
- `POST /api/v1/auth/register` → Register user  
- `POST /api/v1/auth/login` → Login & get JWT  

### 📌 Task Routes (Protected)
- `POST /api/v1/tasks` → Create task  
- `GET /api/v1/tasks` → Get tasks  
- `PUT /api/v1/tasks/:id` → Update task  
- `DELETE /api/v1/tasks/:id` → Delete task

## 🏗️ Scalability Improvements

- **Microservices Architecture**  
  Split into Auth Service & Task Service  

- **Caching (Redis)**  
  Cache frequent requests (e.g., GET /tasks)

- **Database Scaling**  
  Use MongoDB Sharding  

- **Deployment**  
  - Docker  
  - Kubernetes / AWS ECS  
  - NGINX / AWS ALB Load Balancer  

---

## 📌 Notes

- Configure MongoDB Atlas before running  
---

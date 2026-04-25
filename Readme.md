# Task Management Application

## 📌 Project Overview

This is a full-stack Task Management application where users can:

* Register and login using JWT authentication
* Create and manage projects
* Add tasks inside projects
* Update task status (Todo / In Progress / Done)

The application is built using a MERN-like stack with a focus on clean architecture and reusable components.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Frontend

* Next.js (App Router)
* Tailwind CSS

### Deployment

* Frontend: Vercel
* Backend: Render
* Code: GitHub

---

## ⚙️ Local Setup Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/himanshu12sh/TaskManagement.git
cd TaskManagement
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🌐 Deployment URLs

* Frontend: https://task-management-iota-five-12.vercel.app
* Backend:  https://taskmanagement-pde0.onrender.com

---

## 📁 Folder Structure

```
root/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── middleware/
│       ├── config/
│       └── app.js
│
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── hooks/
```

---

## 🔗 API List

### Auth

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

### Projects

* GET `/api/projects` → Get all projects
* POST `/api/projects` → Create project

### Tasks

* GET `/api/tasks/:projectId` → Get tasks by project
* POST `/api/tasks` → Create task
* PUT `/api/tasks/:id` → Update task status

---

## 📌 Notes

* All protected routes require JWT token in headers:

```
Authorization: Bearer <token>
```

* Clean architecture followed (no business logic in routes)
* Reusable components used in frontend

---

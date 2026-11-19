# Full Stack Development (FSD) — Experiments 23 to 25

A consolidated workspace containing three full-stack and React applications developed for Full Stack Development lab experiments (Exp 23, Exp 24, and Exp 25).

---

## 📁 Repository Structure

```text
23-25/
├── mern-crud-app-main/           # Experiment 23: MERN Blog Post CRUD Application
│   ├── backend/                 # Node.js + Express REST API (Port 3000)
│   └── frontend/                # React + Vite Client (Port 5173)
├── react-frontend-crud-app-main/ # Experiment 24: Expense Tracker CRUD Application (Port 5174)
├── react-router-app-main/        # Experiment 25: React Router SPA Navigation (Port 5175)
├── package.json                 # Workspace orchestrator configuration
├── run-all.js                   # Node runner for concurrent process execution
├── start-apps.bat               # Windows one-click launcher
└── .gitignore                   # Global ignore configuration (node_modules, .env, dist)
```

---

## 🚀 Projects Overview

### 1. MERN Blog Post CRUD App (`mern-crud-app-main`)
* **Backend**: Express REST API running on port `3000` with full CRUD endpoints (`/api/v1/posts`). Configured with automatic in-memory fallback if a local MongoDB instance is not connected.
* **Frontend**: React application built with Vite running on port `5173`. Supports creating new blog posts, editing existing posts, and real-time deletion.
* **Endpoints**:
  - `GET /api/v1/posts` — List all posts
  - `GET /api/v1/posts/:id` — Get single post by ID
  - `POST /api/v1/posts` — Create a new post (`title`, `content`)
  - `PUT /api/v1/posts/:id` — Update existing post
  - `DELETE /api/v1/posts/:id` — Delete post by ID

---

### 2. Expense Tracker App (`react-frontend-crud-app-main`)
* **Overview**: Interactive expense management dashboard running on port `5174`.
* **Features**:
  - Add new expenses (Title, Amount, Date).
  - Edit existing transactions with form auto-population.
  - Delete transactions dynamically.
  - Automatic calculation of total expenses across all records.

---

### 3. React Router App (`react-router-app-main`)
* **Overview**: Single-page application demonstrating client-side routing with React Router on port `5175`.
* **Routes**:
  - `/` — Home page
  - `/contact` — Contact page
  - `/students` — Students directory
  - `/details/:id` — Dynamic student profile details route

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ or v22+)
- npm (Node Package Manager)

### Install Dependencies
Dependencies for each project can be installed using npm:

```bash
# MERN Backend
cd mern-crud-app-main/backend && npm install

# MERN Frontend
cd ../frontend && npm install

# Expense Tracker
cd ../../react-frontend-crud-app-main && npm install

# React Router App
cd ../react-router-app-main && npm install
```

---

## 🛠️ Running the Applications

### Option A: Run All at Once (Recommended)
From the root directory (`23-25`):

```bash
npm start
```
*(Or simply double-click `start-apps.bat` on Windows)*

All four servers will start concurrently and open in your default browser:
* **MERN Frontend**: [http://localhost:5173](http://localhost:5173)
* **Expense Tracker**: [http://localhost:5174](http://localhost:5174)
* **React Router App**: [http://localhost:5175](http://localhost:5175)
* **MERN Backend API**: [http://localhost:3000](http://localhost:3000)

---

### Option B: Run Individually

Open separate terminal windows for each application:

```bash
# Terminal 1: MERN Backend
cd mern-crud-app-main/backend
node server.js

# Terminal 2: MERN Frontend
cd mern-crud-app-main/frontend
npm run dev -- --port 5173

# Terminal 3: Expense Tracker
cd react-frontend-crud-app-main
npm run dev -- --port 5174

# Terminal 4: React Router App
cd react-router-app-main
npm run dev -- --port 5175
```

---

## 📄 License
This repository is created for educational and lab practical purposes.

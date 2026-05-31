# 🧩 dv.rubix

> A full-stack Rubik's Cube web app — solve, play, and master the cube with manual sticker input, image color detection, step-by-step solutions, a real-time 3D game, and a global leaderboard.

![JavaScript](https://img.shields.io/badge/JavaScript-95.9%25-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

---

## 📌 Overview

**dv.rubix** is a MERN-stack Rubik's Cube platform that lets users solve the cube multiple ways — by manually painting sticker faces, uploading a photo to auto-detect colors, or through a live 3D interactive game. The backend handles cube-state validation, runs the solving algorithm, and manages a persistent global leaderboard via MongoDB.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Manual Solver** | Paint all 54 stickers, validate the state, and get an optimal solution |
| 📷 **Image Assist** | Upload a cube face photo and pick colors directly from it |
| 🎮 **3D Game** | Scramble and solve in a real-time 3D cube with move/time tracking |
| 🏆 **Leaderboard** | Submit scores and compete for best times and fewest moves globally |
| 🔗 **Share & Import** | Export/import cube states via shareable links |
| ⌨️ **Keyboard Shortcuts** | `U` `D` `R` `L` `F` `B` — `Shift` for prime (inverse) moves |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Three Fiber |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| 3D Rendering | React Three Fiber (`@react-three/fiber`) |
| Cube Solving | [cubejs](https://github.com/ldez/cubejs) |
| Language | JavaScript (ES6+) |

---

## 📁 Project Structure

```
dv.rubix/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages (Solver, Game, Leaderboard)
│       ├── services/        # API call helpers
│       └── utils/           # Cube logic utilities
│
├── server/                  # Node.js + Express backend
│   ├── controllers/         # Route handler logic
│   ├── routes/              # API route definitions
│   ├── models/              # Mongoose schemas
│   └── utils/               # Solver & validation helpers
│
└── .gitignore
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas URI)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/siddhantshukla108/dv.rubix.git
cd dv.rubix
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cube
```

Start the backend:

```bash
npm run dev
```

API will run at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_BASE=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Usage Guide

- **Solver** → Select face colors on the sticker grid → click **Solve Cube** for step-by-step moves
- **Image Assist** → Open the Upload Panel → click colors from your photo to map faces
- **3D Game** → Click **Scramble** → solve using on-screen buttons or keyboard shortcuts
- **Leaderboard** → Complete a solve in Game mode → score auto-submits with your time & move count
- **Manual** → Click "Manual" in the navbar for a full in-app guide

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/solve` | Solve a given cube state, returns move sequence |
| `POST` | `/api/detect` | *(Optional)* Image-based color detection |
| `GET` | `/api/leaderboard` | Fetch global leaderboard entries |
| `POST` | `/api/leaderboard` | Submit a new score |

---

## 🏗️ Architecture

The frontend and backend are fully decoupled:

- **Client** handles all UI, 3D rendering, sticker input, and communicates via REST (Fetch API)
- **Server** owns cube-state validation, solving logic, image processing, and leaderboard persistence
- This separation keeps concerns clean and makes each layer independently scalable

---

## 🛠️ Future Enhancements

- [ ] User accounts with solve history and personal bests
- [ ] Animated solution playback on the 3D cube
- [ ] Timed challenge modes (speed-solve, blindfolded notation)
- [ ] Multiplayer race mode via WebSockets
- [ ] Mobile touch support for 3D cube rotation

---

## 👨‍💻 Author

**Siddhant Shukla**
B.Tech CSE @ Dr. A.P.J. Abdul Kalam Technical University | LeetCode Knight (max 1934)

[![GitHub](https://img.shields.io/badge/GitHub-siddhantshukla108-181717?style=flat&logo=github)](https://github.com/siddhantshukla108)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siddhant%20Shukla-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/siddhantshukla108)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF6B6B?style=flat&logo=vercel)](https://github.com/siddhantshukla108/My-Portfolio)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *"Any sufficiently complex puzzle is indistinguishable from magic — until you understand the algorithm."*

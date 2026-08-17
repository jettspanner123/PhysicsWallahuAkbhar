# 🚀 Physics Wallah - E-Learning Platform

<div align="center">

![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS_11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

<br/>

**A full-stack, modular e-learning platform powered by a Turbo monorepo.**

</div>

---

### 📋 Prerequisites

![NodeJS](https://img.shields.io/badge/Node.js-≥18.x-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-≥9.x-CB3837?style=for-the-badge&logo=npm&logoColor=white)

---

### ⚡ Quick Start (Run Everything)

#### 1️⃣ Install All Dependencies
Run from the root directory:
```bash
npm install
```

#### 2️⃣ Setup Backend Environment & Prisma
Generate the Prisma database client:
```bash
cd InfraServiceLayerMSC
npx prisma generate
cd ..
```

> [!NOTE]
> Ensure your `DATABASE_URL` is set in `InfraServiceLayerMSC/.env`.

#### 3️⃣ Launch the Application
Start both the Frontend and Backend concurrently with Turborepo:
```bash
npm run dev
```

---

### 🌐 App Access Endpoints

| Service | Badge | URL |
| :--- | :---: | :--- |
| **Frontend UI** | ![Client](https://img.shields.io/badge/Frontend-5173-61DAFB?style=for-the-badge&logo=react&logoColor=black) | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | ![Server](https://img.shields.io/badge/Backend-3000-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) | [http://localhost:3000](http://localhost:3000) |

---

### 🛠️ Run Services Individually *(Optional)*

#### 💻 Frontend Only (Vite + React)
```bash
cd ClientServiceLayerMSC
npm run dev
```

#### ⚙️ Backend Only (NestJS + Prisma)
```bash
cd InfraServiceLayerMSC
npm run start:dev
```

---

### 📦 Build for Production

```bash
npm run build
```

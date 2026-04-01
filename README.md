# 📊 InsightAdmin: Production-Grade MEAN Dashboard

InsightAdmin is a full-stack administrative platform built with the **MEAN stack** (MongoDB, Express, Angular, Node.js). It features real-time analytics, robust Role-Based Access Control (RBAC), and a secure authentication system.

---

## 🖼️ Preview

<div align="center">
  <img src="<img width="1911" height="921" alt="image" src="https://github.com/user-attachments/assets/88ecf246-7b08-48ec-9df0-1f2dad0d6283" />
" alt="Dashboard Overview" width="800">
  <p><i>Figure 1: Real-time Analytics Dashboard showing User Growth and Role Distribution.</i></p>
</div>

---

## 🚀 Key Features

- **🔐 Secure Authentication**: JWT-based authentication with `bcryptjs` for password hashing and `express-validator` for input sanitization.
- **🛡️ Role-Based Access Control (RBAC)**: Distinct permissions for `admin` and `user` roles, enforced on both frontend components and backend middleware.
- **📈 Real-time Analytics**: Dynamic charts using **Chart.js** (`ng2-charts`) powered by MongoDB aggregation pipelines.
- **👥 User Management**: Full CRUD operations for managing system accounts, including activation/deactivation and deletion.
- **📝 Content Management**: A dedicated system for publishing and managing platform-wide announcements.
- **📱 Responsive Design**: Modern, mobile-first UI built with **Tailwind CSS** and Angular 17 Standalone components.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Angular 17+, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js, Helmet (Security) |
| **Database** | MongoDB, Mongoose |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |

---

## 📂 Project Structure

```text
InsightAdmin/
├── backend/            # Express.js API
│   ├── models/         # Mongoose Schemas (User, Content)
│   ├── routes/         # API Endpoints (Auth, Analytics, Users)
│   ├── middleware/     # Auth & Admin Guards
│   └── server.js       # Entry Point
└── frontend/           # Angular Standalone App
    ├── src/app/
    │   ├── dashboard/  # Analytics & Charts
    │   ├── users/      # User Management Table
    │   ├── services/   # API & Auth Services
    │   └── guards/     # Frontend Route Guards
    └── tailwind.config.js
```

---

## 📸 System Screenshots

### 1. Authentication Portal
> [!NOTE]
> Add your login screen screenshot here to demonstrate the secure entry point.
![Login Screen Placeholder](https://via.placeholder.com/600x350.png?text=Login+Portal+Screenshot)

### 2. Administrative Dashboard
> [!TIP]
> This view shows the live MongoDB aggregations for signups and sales.
![Dashboard Screenshot Placeholder](https://via.placeholder.com/600x350.png?text=Admin+Dashboard+Screenshot)

### 3. User & Content Management
![User Management Screenshot Placeholder](https://via.placeholder.com/600x350.png?text=User+Management+Screenshot)

---

## 🔧 Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running on `localhost:27017`)
- Angular CLI (`npm install -g @angular/cli`)

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd InsightAdmin

# Setup Backend
cd backend
npm install
node server.js

# Setup Frontend (New Terminal)
cd frontend
npm install
ng serve
```

### 3. Default Credentials
- **Admin Email**: `admin@insight.com`
- **Password**: `admin123`

---

## ⚖️ Security Features
- **Helmet**: Secured HTTP headers to prevent common vulnerabilities.
- **Express Validator**: Strict validation for all registration and login inputs.
- **CORS Configuration**: Controlled access to the backend API.
- **Protected Routes**: Middleware verifies JWT before allowing access to sensitive administrative data.

---

<div align="center">
  Built with ❤️ by the InsightAdmin Team
</div>

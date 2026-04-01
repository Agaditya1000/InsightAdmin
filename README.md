# Insight Admin Dashboard

A full-stack MEAN (MongoDB, Express, Angular, Node.js) Admin Dashboard with analytics and interactive reporting capabilities. Built specifically to demonstrate a robust authentication system, Role-Based Access Control (RBAC), and responsive UI metrics.

## 🚀 Features:
- **Secure Authentication**: JWT-based login mechanism.
- **Role-Based Access Control**: Distinguishes between `admin` and standard `user` permissions.
- **RESTful API backend**: Fully isolated Express API connected to MongoDB.
- **Data Visualization**: Live Chart.js integration showing signups and sales over time.
- **User Management**: Admin capabilities to view, enable, and disable user accounts.
- **Modern Responsive UI**: Built with Angular 17 Standalone and Tailwind CSS, featuring mobile-first design principles.

## 🛠️ Tech Stack:
- **Database**: MongoDB (Mongoose Schema)
- **Backend API**: Node.js, Express.js
- **Frontend App**: Angular 17+, Tailwind CSS
- **Visualization**: Chart.js (`ng2-charts`)

---

## 💻 Local Setup Instructions

### Prerequisites
1. Ensure [Node.js](https://nodejs.org/) (v18+) is installed.
2. Ensure you have a local instance of [MongoDB](https://www.mongodb.com/try/download/community) running on port `27017`.
3. Install Angular CLI globally: `npm install -g @angular/cli`.

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Start the server (this will automatically connect to MongoDB):
   ```bash
   node server.js
   ```
   *The backend will be running on `http://localhost:3000`.*
   *Note: A default admin user uses `admin@insight.com` / `admin123`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Angular development server:
   ```bash
   ng serve
   ```
   *The frontend will be running on `http://localhost:4200`.*

### 3. Usage & Testing
1. Navigate your browser to `http://localhost:4200`.
2. Login with the seeded default admin credentials:
   - **Email:** `admin@insight.com`
   - **Password:** `admin123`

3. Explore the Dashboard and User Management views.

---

## 📸 Screenshots
*(Candidate Note: Take screenshots of the Login Page, the Dashboard Page, and the User Management list while running the project locally, and attach them to your final email submission.)*

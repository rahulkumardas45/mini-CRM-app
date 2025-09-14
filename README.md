📊 MiniCRM – Customer Relationship Management System

MiniCRM is a full-stack MERN application for managing customers, leads, and reports.
This project was developed as part of an assignment to demonstrate authentication, CRUD operations, and reporting features.

⚙️ Setup Instructions
1️⃣ Prerequisites

Make sure you have:

Node.js (>= 18)

MongoDB (local instance or MongoDB Atlas)

npm or yarn

2️⃣ Clone the Repository
git clone https://github.com/rahulkumardas45/CRM-web.git
cd minicrm

3️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:


MONGO_URI = "mongodb+srv://rahulkumar46:dbrahulkumar@cluster0.ekevymb.mongodb.net"
PORT=5000
JWT_SECRET="KJFKJKDFHGHBCHJVHJFVHMV"
NODE_ENV=development



Run backend:

npm run dev


Backend will be available at: http://localhost:5000

4️⃣ Frontend Setup
cd frontend
npm install


Run frontend:

npm run dev


Frontend will be available at: http://localhost:5173

🛠️ Tech Stack Used
Frontend

React.js (Vite) – Component-based UI

TailwindCSS – Responsive styling

React Router – Navigation & private routes

Recharts – Interactive data visualization

Backend

Node.js + Express.js – REST API

MongoDB + Mongoose – Database & schema models

JWT + bcrypt – Authentication & password hashing

🎁 Bonus Features Implemented

JWT Authentication with role-based access.

Private Routes (only logged-in users can access dashboard, customers, and reports).

Customer & Leads Management with CRUD operations.

Reports Dashboard with Pie & Bar charts (Recharts).

Responsive UI (mobile + desktop).

Error handling & notifications (invalid login, CRUD errors).
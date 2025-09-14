import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import local files (use default or named export depending on how you wrote them)
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import leadRoutes from './routes/leadRoutes.js';


dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To accept JSON data

// Define Routes
app.use('/api/auth', authRoutes);
 app.use('/api/customers', customerRoutes);
 app.use('/api/customers', leadRoutes);
// You might nest lead routes under customers

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { protect, adminOnly } from './middleware/authMiddleware.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import financialInstitutionRoutes from './routes/financialInstitutions.js';
import userRoutes from './routes/userRoutes.js';
import impactRoutes from './routes/impactRoutes.js';

// Configure environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173' // Local development frontend
    : process.env.FRONTEND_URL, // Production frontend URL from environment variable
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Documentation Route
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/financial-institutions', financialInstitutionRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/marketplace', marketplaceRoutes); // Marketplace is public for browsing

// Protected Routes
app.use('/api/users', protect, userRoutes);
app.use('/api/loans', protect, loanRoutes);
app.use('/api/impact', protect, impactRoutes);

// Admin Protected Routes
app.use('/api/admin/roles', protect, adminOnly, roleRoutes);
app.use('/api/admin/financial-institutions', protect, adminOnly, financialInstitutionRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
  🌍 Server running in ${ENVIRONMENT} mode
  🚀 Listening on port ${PORT}
  🔒 Authentication required for protected routes
  👑 Admin privileges required for admin routes
  📚 API docs available at /api-docs
  💳 Marketplace endpoints available at /api/marketplace
  `);
});

export default app;
